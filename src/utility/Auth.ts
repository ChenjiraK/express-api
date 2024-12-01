import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10); // สร้าง Salt
    return await bcrypt.hash(password, salt); // Hash รหัสผ่าน
};
  
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash); // ตรวจสอบ Password กับ Hash
};