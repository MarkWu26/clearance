const db = require('../utils/db');



//helper functions


//GET
const getUnitResource = (id) =>{
    return new Promise ((resolve, reject) => {
        if(id === "0") {
            resolve("ALL");
            }
            else{
            db.execute('SELECT abbrev FROM units WHERE id = ?', [id], (err, data) => {
            if(err){
                console.log(err)
                reject (err);
            } else{
               
                resolve (data[0].abbrev);
            }
            });
        }
    });
     
    
    
};

// GET
const getOfficeResource = async (id) => {
    return new Promise(async (resolve, reject) => {
        if (id === "0") {
            resolve("ALL");
        } else {
            try {
                const [data] = await db.execute('SELECT name FROM clearing_offices WHERE id = ?', [id]);
                resolve(data && Array.isArray(data) && data.length > 0 ? data[0].name : null);

            } catch (err) {
                console.error(err);
                reject(err);
            }
        }
    });
};


//INPUT SANITATION

const sql_safe = (input) => {
    if(!input) 
		{
			input = "";
		}
    input = input.trim();
	input = input.replace("'","'");
    input = input.replace(/\\'/g,"'");
    return escapeHtml(input);

}

const escapeHtml = (input) => {
    if (typeof input !== 'string') return input;

    return input.replace(/[&<>"']/g, function (match) {
        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escapeMap[match];
    });
}

const decodeHtml = (input) => {
    if (typeof input !== 'string') return input;
    return input.replace('&#39;', "'");
}

module.exports = {
    getUnitResource,
    getOfficeResource,
    sql_safe,
    escapeHtml,
    decodeHtml
};

