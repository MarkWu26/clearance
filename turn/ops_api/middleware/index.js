const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({message: 'You do not have permissions to access this API.'});
    }

    try {
        if(token === process.env.secretKey){
            next();
        } else {
            return res.status(401).json({message: 'Invalid token!'})
        }
    } catch (error) {
        console.log('error: ', error)
        return res.status(401).json({message: 'Invalid token!'})
    }
}

module.exports = verifyToken