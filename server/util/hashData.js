import bcrypt from "bcrypt";

const hashData = async (data, saltRounds = 10) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedData = await bcrypt.hash(data, salt);
        return hashedData;
    }
        catch (err) {
            throw err;
    }

}