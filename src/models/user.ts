import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
    email: string;
    firstname: string;
    lastname: string;
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
});

export default mongoose.model<User>('User', UserSchema);
