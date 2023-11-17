import { Schema, model } from 'mongoose';
import { User } from '../interfaces/user.interface';

const UserSchema = new Schema<User>(
    {
        //_id: {    type: String, _id:false},
        name: { type: String, required: true,minlength:2,maxlength:20 },
        surname: { type: String, required: true,minlength:2,maxlength:50 },
        role:  { type: String, required: true, minlength:2, maxlength:20 },
        email: { type: String, required: true, unique:true},
        password: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const UserModel = model<User>('User', UserSchema);

export default UserModel;
