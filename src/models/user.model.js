import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    verified: {
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.comparePassword = (candidatePassword) => {

    return bcrypt.compare(this.password, candidatePassword);
}

const userModel = mongoose.model("User", userSchema)

export default userModel