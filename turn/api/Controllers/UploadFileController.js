const db = require("../utils/db");
const mysql = require("mysql2/promise");
const multer = require("multer");
const fs = require("fs").promises;
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const xlsx = require("xlsx");
const xml2js = require("xml2js");

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 1024 * 1024 * 5 },
}); // Limit file size to 5MB

const processAndInsertData = async (parsedItems) => {
  const connection = await mysql.createConnection(db.config);

  try {
    // Start a transaction
    await connection.beginTransaction();

    await insertDetailRecords(connection, parsedItems);

    // Commit the transaction
    await connection.commit();

    // Respond to the client
    return {
      success: true,
      message: "File processed and items added to active_holdlist!",
      itemCount: parsedItems.length,
    };
  } catch (error) {
    // Rollback the transaction in case of an error
    await connection.rollback();
    console.log("Database Error:", error);
    res
      .status(500)
      .json({
        message: "Error processing data and inserting into the database.",
      });
  } finally {
    // Close the database connection
    await connection.end();
  }
};

// Function to delete records by batch number
const deleteRecordsByBatchNumber = async (connection, batchNumber) => {
  const query = "DELETE FROM active_holdlist WHERE hdr_id = ?";
  await connection.execute(query, [batchNumber]);
};

// Function to insert detail records
/* const insertDetailRecords = async (connection, parsedItems, batchNumber) => {
    const query = 'INSERT INTO active_holdlist (hdr_id, idnum, office_id, unit, hold_type, remarks, fines, added_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
    const values = parsedItems.map(item => [batchNumber, item.idnum, item.office_id, item.unit, item.hold_type, item.remarks, item.fines, item.added_at]);

    await connection.execute(query, values);
}; */

const insertDetailRecords = async (connection, parsedItems) => {
  const office_code = "MAI0021";
  const insertQuery =
    "INSERT INTO active_holdlist (stud_id, name, phone_number, description, remarks, office_code, year, added_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const updateQuery =
    "UPDATE active_holdlist SET name = ?, phone_number = ?, description = ?, remarks = ?, year = ?, added_at = ? WHERE stud_id = ?";

  let currentIndex = 0;

  // Fetch existing student IDs efficiently
  const existingStudent = new Set(); // Use Set for efficient lookup
  const existingData = await connection.execute("SELECT stud_id, year FROM active_holdlist");
  existingData[0].forEach((row) => existingStudent.add(`${row.stud_id}-${row.year}`)); // Add IDs to Set

  for (const item of parsedItems) {
    let { name, phoneNumber, id, remarks, description, year } = item;
    const added_at = new Date().toISOString().slice(0, 19).replace("T", " ");
    const key = `${id}-${year}`;
    if(!year || year === ''){
        return error;
    }
    if (existingStudent.has(key)) {
      if (currentIndex + 1 < parsedItems.length && (parsedItems[currentIndex + 1].name === null ||parsedItems[currentIndex + 1].name === "" || parsedItems[currentIndex + 1].name === undefined)) {

        remarks = `${remarks}, ${parsedItems[currentIndex + 1].remarks} `;
        await connection.execute(updateQuery, [name, phoneNumber, description, remarks, year, added_at, id,]);
        currentIndex++;
        continue;
      }
      if (!name || !remarks) {
        currentIndex++;
        continue;
      } else if (phoneNumber === 0 || phoneNumber === "") {
        phoneNumber = "N/A";
      }
      await connection.execute(updateQuery, [name, phoneNumber, description, remarks, year, added_at,id,]);

      currentIndex++;
    } else {
      if (
        currentIndex + 1 < parsedItems.length &&
        (parsedItems[currentIndex + 1].name === null ||
          parsedItems[currentIndex + 1].name === "" ||
          parsedItems[currentIndex + 1].name === undefined)
      ) {
        remarks = `${remarks}, ${parsedItems[currentIndex + 1].remarks} `;
        await connection.execute(insertQuery, [id, name, phoneNumber, description, remarks, office_code, year, added_at,]);
        currentIndex++;
        continue;
      }
      if (!name || !remarks) {
        currentIndex++;
        continue;
      } else if (phoneNumber === 0 || phoneNumber === "") {
        phoneNumber = "N/A";
      }
      await connection.execute(insertQuery, [id, name, phoneNumber, description,remarks, office_code, year, added_at,]);

      currentIndex++;
    }
  }
};

const uploadAndParse = async (filePath) => {
  if (!filePath) {
    return res.status(400).json({ message: "No file was uploaded." });
  }

  // Validate file type
  const validTypes = [
    "text/plain",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!validTypes.includes(filePath.mimetype)) {
    fs.unlinkSync(filePath.path);
    return res.status(400).json({ message: "Invalid file type." });
  }

  try {
    const fileContent = await fs.readFile(
      filePath.path,
      filePath.mimetype === "application/pdf" ? null : "utf8"
    );

    let parsedItems;
    switch (filePath.mimetype) {
      case "text/plain":
        parsedItems = parsePLAIN(fileContent);
        break;
      case "application/pdf":
        parsedItems = await parsePDF(filePath.path); // For PDF, pass the file path
        break;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        parsedItems = await parseDOCX(filePath.path); // For DOCX, pass the file path
        break;

      default:
        return { success: false, message: "Unsupported file type" };
    }

    if (!parsedItems || parsedItems === false) {
      return { success: false, message: "No valid data found on this file" };
    }

    if (parsedItems) {
      return await processAndInsertData(parsedItems);
      
    } else {
      res.status(400).json({ success: "false", message: "No valid data found in file." });
    }

  } catch (error) {
    console.error('Upload and Parse Error:', error); 
    return { success: false };
  }
};

const processFile = async (filePath) => {
  try {
    console.log("File path:", filePath.path); // Add this line for debugging

    // read the file content using fs.readFile
    const fileContent = await fs.readFile(filePath.path, "utf8");
    console.log("File content:", fileContent);

    // count the number of lines in the file
    const lines = fileContent.split("\n");
    const lineCount = lines.length;
    console.log("Number of lines in the file:", lineCount);

    // This function should return the processed result
    return { processed: true, filePath: filePath.path, lineCount }; // Access the path property
  } catch (error) {
    // Handle any errors that might occur during processing
    console.error("Error during file processing:", error);
    return { processed: false, error: error.message };
  }
};

const parseCSV = (content) => {
  const lines = content.split("\n");
  const items = [];
  for (let line of lines) {
    if (line.trim() !== "") {
      const [idnum, officeId, unit, holdType, remarks, fines] = line.split(",");
      const item = {
        idnum: idnum.trim(),
        office_id: parseInt(officeId.trim(), 10),
        unit: unit.trim(),
        hold_type: parseInt(holdType.trim(), 10),
        remarks: remarks.trim(),
        fines: parseFloat(fines.trim()),
        added_at: new Date(),
      };
      items.push(item);
    }
  }
  return items;
};

const parseXML = async (content) => {
  const parser = new xml2js.Parser();
  try {
    const result = await parser.parseStringPromise(content);
    return transformXMLData(result);
  } catch (error) {
    console.error("Error parsing XML:", error);
    return [];
  }
};

const transformXMLData = (xmlData) => {
  return xmlData.records.record.map((item) => {
    return {
      idnum: item.idnum[0],
      office_id: parseInt(item.officeId[0], 10),
      unit: item.unit[0],
      hold_type: parseInt(item.holdType[0], 10),
      remarks: item.remarks[0],
      fines: parseFloat(item.fines[0]),
      added_at: new Date(item.addedAt[0]),
    };
  });
};

const parseJSON = (content) => {
  try {
    const json = JSON.parse(content);
    return transformJsonData(json);
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return [];
  }
};

const transformJsonData = (json) => {
  return json.map((item) => ({
    idnum: item.idnum.trim(),
    office_id: parseInt(item.officeId.trim(), 10),
    unit: item.unit.trim(),
    hold_type: parseInt(item.holdType.trim(), 10),
    remarks: item.remarks.trim(),
    fines: parseFloat(item.fines),
    added_at: new Date(),
  }));
};

const parsePDF = async (filePath) => {
  try {
    const data = await pdfParse(filePath);
    return parseData(data.text);
  } catch (error) {
    console.error("Error parsing PDF:", error);
    return [];
  }
};

const transformPDFData = (text) => {
  const items = [];
  const lines = text.split("\n");
  for (let line of lines) {
   /*  const [idnum, officeId, unit, holdType, remarks, fines] = line.split(",");
    items.push({
      idnum: idnum.trim(),
      office_id: parseInt(officeId.trim(), 10),
      unit: unit.trim(),
      hold_type: parseInt(holdType.trim(), 10),
      remarks: remarks.trim(),
      fines: parseFloat(fines.trim()),
      added_at: new Date(),
    }); */
    console.log('line: ', line)
  }
  return items;
};

const parsePLAIN = (content) => {
  /*  console.log('content: ', content) */
  const response = parseData(content);
  console.log("response: ", response);
  return response;
};

const parseDOCX = async (filePath) => {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return parseData(result.value);
  } catch (error) {
    console.error("Error parsing DOCX:", error);
    return [];
  }
};

const parseData = (text) => {
  const records = [];
  const lines = text.split("\n");
  // Regular expressions
  const nameRegex = /^([A-Z][A-Z\s,.-]+?)(?=\s+([A-Z]{2,3}\s+\d{4}\s+\d{4})\b(?!4))/;
  const phoneRegex = /[A-Z]{2,3}\s+\d{4}\s+\d{4}\s+(\S+)/g;
  const assessedFinesRegex = /Total Assessed Fines:\s+Php([\d.,]*)/;
  const pendingFinesRegex = /Total Pending Fines:\s+Php\s*([\d.,]+)/;
  const idRegex = /([A-Z]{2,3}\s+\d{4}\s+\d{4})/;
  const yearRegex = /SY (\d{4}-\d{4})/;
 
  let description = '';

  let currentRecord = {};
  let assessedFines = null; // Variable to store assessed fines amount
  let pendingFines = null; // Variable to store pending fines amount
  let year = null;
  let isValid = false;
  
  for (let line of lines) {
    //check if the document is legit
    if (line.trim().includes("Ateneo de Zamboanga University")) {
      isValid = true;
    }

    const phoneMatch = phoneRegex.exec(line);
    const nameMatch = line.match(nameRegex);
    const assessedFinesMatch = assessedFinesRegex.exec(line);
    const pendingFinesMatch = pendingFinesRegex.exec(line);
    const idMatch = line.match(idRegex);
    const yearMatch = line.match(yearRegex)
  
    if (yearMatch) {
      year = yearMatch[1]; // Extract school year
      // Check the previous line for description
      let lastIndex = lines.indexOf(line) - 1;
      if(lines[lastIndex].trim() === ''){
        lastIndex = lines.indexOf(line) - 2;
          description = lines[lastIndex].trim();
      } else {
        if (lastIndex < lines.length) {
          description = lines[lastIndex].trim();
        }
      }
    }

    // Process name, phone number, and ID
    if (phoneMatch || nameMatch || idMatch) {
      // Push the previous record if it has fines information
      if (Object.keys(currentRecord).length > 0 && (assessedFines !== null || pendingFines !== null)) {
        currentRecord.remarks =
          assessedFines !== null
            ? `Total Assessed Fines: ${parseFloat(assessedFines.replace(",", ""))}`
            : `Total Pending Fines: ${parseFloat(pendingFines.replace(",", ""))}`;
        if (assessedFines !== null && pendingFines !== null) {
          currentRecord.remarks += `, Total Pending Fines: ${parseFloat(pendingFines.replace(",", ""))}`;
        }

        records.push(currentRecord);
        currentRecord = {}; // Reset record object
        assessedFines = null; // Reset assessed fines
        pendingFines = null; // Reset pending fines
      }

      if (nameMatch) {
        currentRecord.name = nameMatch[0].trim();
      }

      if (phoneMatch) {
        currentRecord.phoneNumber = phoneMatch[1];
      } else {
        currentRecord.phoneNumber = "N/A";
      }

      if (idMatch) {
        const id = idMatch[1];
        currentRecord.id = id;
      }
    } else if (assessedFinesMatch || pendingFinesMatch) {
      // Process fines information
      if (assessedFinesMatch) {
        assessedFines = assessedFinesMatch[1]; // Store assessed fines amount
      }
      if (pendingFinesMatch) {
        pendingFines = pendingFinesMatch[1]; // Store pending fines amount
      }
      currentRecord.description = description;
       currentRecord.year =  year || ''
    }

  }

  // Push the last record if it has fines information
  if (Object.keys(currentRecord).length > 0 && (assessedFines !== null || pendingFines !== null || assessedFines !== '' || pendingFines !== '')) {
    currentRecord.remarks =
      assessedFines !== null
        ? `Total Assessed Fines: ${parseFloat(assessedFines.replace(",", ""))}`
        : `Total Pending Fines: ${parseFloat(pendingFines.replace(",", ""))}`;
    if (assessedFines !== null && pendingFines !== null) {
      currentRecord.remarks += `, Total Pending Fines: ${parseFloat(pendingFines.replace(",", ""))}`;
    }
    records.push(currentRecord);
  }

  if (!isValid) {
    return false;
  }
  return records;
};

const parseXLSX = (filePath) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
    return transformXLSXData(jsonData);
  } catch (error) {
    console.error("Error parsing XLSX:", error);
    return [];
  }
};

const transformXLSXData = (jsonData) => {
  return jsonData.map((item) => {
    return {
      idnum: item.idnum,
      office_id: parseInt(item.officeId, 10),
      unit: item.unit,
      hold_type: parseInt(item.holdType, 10),
      remarks: item.remarks,
      fines: parseFloat(item.fines),
      added_at: new Date(item.addedAt),
    };
  });
};

const insertItems = async (items, res) => {
  try {
    const viewClearanceLinks = []; // Array to store links for existing students

    for (const item of items) {
      // Check if a student with the same ID already exists in the database
      const existingStudent = await checkExistingStudent(item.idnum);

      if (existingStudent) {
        // If the student exists, provide a link to view clearance
        viewClearanceLinks.push({
          idnum: item.idnum,
          viewClearanceLink: `http://yourdomain.com/view-clearance/${existingStudent.unique_identifier}`,
        });
      } else {
        // If the student doesn't exist, insert the new record
        await insertNewItem(item);
      }
    }

    // Respond with the links for existing students
    if (viewClearanceLinks.length > 0) {
      return res.json({
        message: "File processed and items added to active_holdlist!",
        itemCount: items.length,
        viewClearanceLinks,
      });
    } else {
      return res.json({
        message: "File processed and items added to active_holdlist!",
        itemCount: items.length,
      });
    }
  } catch (dbError) {
    console.error("Database Insert Error:", dbError);
    throw new Error("Error inserting items into database");
  }
};

module.exports = {
  processAndInsertData,
  deleteRecordsByBatchNumber,
  insertDetailRecords,
  processFile,
  uploadAndParse,
  insertItems,
};
