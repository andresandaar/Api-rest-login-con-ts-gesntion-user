import { Schema, model } from 'mongoose';
import { User } from '../interfaces/user.interface';

const UserSchema = new Schema<User>(
    {
        name: { type: String, required: true,minlength:2,maxlength:20 },
        surname: { type: String, required: true,minlength:2,maxlength:50 },
        email: { type: String, required: true},
        password: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const UserModel = model<User>('User', UserSchema);

export default UserModel;
