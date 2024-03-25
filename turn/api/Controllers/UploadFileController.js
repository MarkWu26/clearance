const db = require('../utils/db');
const mysql = require('mysql2/promise'); 
const multer = require('multer');
const fs = require('fs').promises;
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const xlsx = require('xlsx');
const xml2js = require('xml2js');

const upload = multer({ dest: 'uploads/', limits: { fileSize: 1024 * 1024 * 5 }}); // Limit file size to 5MB

const processAndInsertData = async (parsedItems, res) => {
    const connection = await mysql.createConnection(db.config);

    try {
        // Start a transaction
        await connection.beginTransaction();

        // Process and insert data logic
        //const batchNumber = /* Obtain or generate batch number */;

        await deleteRecordsByBatchNumber(connection, batchNumber);
        await insertDetailRecords(connection, parsedItems, batchNumber);

        // Commit the transaction
        await connection.commit();

        // Respond to the client
        res.json({ message: 'File processed and items added to active_holdlist!', itemCount: parsedItems.length });
    } catch (error) {
        // Rollback the transaction in case of an error
        await connection.rollback();
        console.error('Database Error:', error);
        res.status(500).json({ message: 'Error processing data and inserting into the database.' });
    } finally {
        // Close the database connection
        await connection.end();
    }
};


// Function to delete records by batch number
const deleteRecordsByBatchNumber = async (connection, batchNumber) => {
    const query = 'DELETE FROM active_holdlist WHERE hdr_id = ?';
    await connection.execute(query, [batchNumber]);
};


// Function to insert detail records
const insertDetailRecords = async (connection, parsedItems, batchNumber) => {
    const query = 'INSERT INTO active_holdlist (hdr_id, idnum, office_id, unit, hold_type, remarks, fines, added_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
    const values = parsedItems.map(item => [batchNumber, item.idnum, item.office_id, item.unit, item.hold_type, item.remarks, item.fines, item.added_at]);

    await connection.execute(query, values);
};

const uploadAndParse = async (filePath) => {
  
    if (!filePath) {
        console.log('no file!')
        return res.status(400).json({ message: 'No file was uploaded.' });
    }

    console.log('req file: ', filePath )

    // Validate file type
    const validTypes = ['text/csv', 'text/xml', 'application/json', 'text/plain', 
    'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]; 

    if (!validTypes.includes(filePath.mimetype)) {
        fs.unlinkSync(filePath.path); 
        return res.status(400).json({ message: 'Invalid file type.' });
    }

    try {
        const fileContent = await fs.readFile(filePath.path, filePath.mimetype === 'application/pdf' ? null : 'utf8');
        /* await fs.unlink(filePath.path); */ // Delete the file after reading

        let parsedItems;
        switch (filePath.mimetype) {
            case 'text/csv':
                parsedItems = parseCSV(fileContent);
                break;
            case 'text/xml':
                parsedItems = parseXML(fileContent);
                break;
            case 'application/json':
                parsedItems = parseJSON(fileContent);
                break;
            case 'text/plain':
                parsedItems = parsePLAIN(fileContent);
                break;
            case 'application/pdf':
                parsedItems = await parsePDF(filePath.path); // For PDF, pass the file path
                break;
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                parsedItems = await parseDOCX(filePath.path); // For DOCX, pass the file path
                break;
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                parsedItems = parseXLSX(filePath.path); // For XLSX, pass the file path
                break;
            default:
                /* return res.status(400).json({ message: 'Unsupported file type.' }); */
                return {success: 'false'}
        }
        return { processed: true, filePath: filePath.path,  };
       /*  if (parsedItems && parsedItems.length > 0) {
            console.log('okay')
            await processAndInsertData(parsedItems, res);
        } else {
            res.status(400).json({ message: 'No valid data found in file.' });
        } */
    } catch (error) {
       /*  console.error('Upload and Parse Error:', error);
        res.status(500).json({ message: 'Server error during file processing.' }); */
        return {success: 'false'}
    }
};

const processFile = async (filePath) => {
    try {
        console.log('File path:', filePath.path);  // Add this line for debugging

        // read the file content using fs.readFile
        const fileContent = await fs.readFile(filePath.path, 'utf8');
        console.log('File content:', fileContent);

        // count the number of lines in the file
        const lines = fileContent.split('\n');
        const lineCount = lines.length;
        console.log('Number of lines in the file:', lineCount);

        // This function should return the processed result
        return { processed: true, filePath: filePath.path, lineCount };  // Access the path property
    } catch (error) {
        // Handle any errors that might occur during processing
        console.error('Error during file processing:', error);
        return { processed: false, error: error.message };
    }
};



const parseCSV = (content) => {
    const lines = content.split('\n');
    const items = [];
    for (let line of lines) {
        if (line.trim() !== '') {
            const [idnum, officeId, unit, holdType, remarks, fines] = line.split(',');
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
        console.error('Error parsing XML:', error);
        return [];
    }
};

const transformXMLData = (xmlData) => {
    
    return xmlData.records.record.map(item => {
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
        console.error('Error parsing JSON:', e);
        return [];
    }
};

const transformJsonData = (json) => {
    return json.map(item => ({
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
        return transformPDFData(data.text);
    } catch (error) {
        console.error('Error parsing PDF:', error);
        return [];
    }
};

const transformPDFData = (text) => {
    const items = [];
    const lines = text.split('\n');
    for (let line of lines) {
        const [idnum, officeId, unit, holdType, remarks, fines] = line.split(',');
        items.push({
            idnum: idnum.trim(),
            office_id: parseInt(officeId.trim(), 10),
            unit: unit.trim(),
            hold_type: parseInt(holdType.trim(), 10),
            remarks: remarks.trim(),
            fines: parseFloat(fines.trim()),
            added_at: new Date(),
        });
    }
    return items;
};

const parseDOCX = async (filePath) => {
    try {
        const result = await mammoth.extractRawText({ path: filePath });
       /*  console.log('result: ', result, 'result.value: ', result.value) */
        return transformDOCXData(result.value);
    } catch (error) {
        console.error('Error parsing DOCX:', error);
        return [];
    }
};

const transformDOCXData = (text) => {
    const records = [];
    const lines = text.split('\n');
    const nameRegex = /^([A-Z][A-Z\s,.]+?)(?=\s+CO\b(?!4))/;
    const phoneRegex = /CO\s+\d{4}\s+\d{4}\s+(.*)/g;
    const assessedFinesRegex = /Total Assessed Fines:\s+Php([\d.,]+)/;
    const pendingFinesRegex = /Total Pending Fines:\s+Php([\d.,]+)/
    let currentRecord = {};
    for(let line of lines){
        const phoneMatch = phoneRegex.exec(line);
        const nameMatch = line.match(nameRegex);
        const assessedFinesMatch = assessedFinesRegex.exec(line);
        const pendingFinesMatch = pendingFinesRegex.exec(line)
        //name
        if(phoneMatch || nameMatch){
            if(Object.keys(currentRecord).length > 0){
                records.push(currentRecord);
            }
            currentRecord = {}

            if(nameMatch){
                currentRecord.name = nameMatch[0].trim()
            }

            if(phoneMatch){
                currentRecord.phoneNumber = phoneMatch[1];
            }else {
                currentRecord.phoneNumber = 0;
            }
        } else if (assessedFinesMatch || pendingFinesMatch){
            if(assessedFinesMatch){
                currentRecord.assessedFines = parseFloat(assessedFinesMatch[1].replace(",", ""))
            } else if (pendingFinesMatch){
                currentRecord.pendingFines = parseFloat(pendingFinesMatch[1].replace(",", ""))
            }
            
        }
      
     /*    if(nameMatch){
            const name = nameMatch[0].trim()
        } */

        //phone number
      /*   if (phoneMatch) {
            const phoneNumber = phoneMatch[1]; 
            console.log('Phone number:', phoneNumber);
        } */
      
        
    }
  //  console.log('items: ', items)
  if(Object.keys(currentRecord).length > 0){
    records.push(currentRecord)
  }

  console.log('records: ', records)
  /*   return items; */
};

const parseXLSX = (filePath) => {
    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);
        return transformXLSXData(jsonData);
    } catch (error) {
        console.error('Error parsing XLSX:', error);
        return [];
    }
};

const transformXLSXData = (jsonData) => {
    return jsonData.map(item => {
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
                    viewClearanceLink: `http://yourdomain.com/view-clearance/${existingStudent.unique_identifier}`
                });
            } else {
                // If the student doesn't exist, insert the new record
                await insertNewItem(item);
            }
        }

        // Respond with the links for existing students
        if (viewClearanceLinks.length > 0) {
            return res.json({ 
                message: 'File processed and items added to active_holdlist!',
                itemCount: items.length,
                viewClearanceLinks
            });
        } else {
            return res.json({ 
                message: 'File processed and items added to active_holdlist!',
                itemCount: items.length
            });
        }
    } catch (dbError) {
        console.error('Database Insert Error:', dbError);
        throw new Error('Error inserting items into database');
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