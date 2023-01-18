import { Request, Response } from 'express';
import { pool } from '../database';
import { QueryResult } from 'pg';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
   try {
      const response: QueryResult = await pool.query(
         'SELECT * FROM users ORDER BY id ASC'
      );
      return res.status(200).json(response.rows);
   } catch (e) {
      console.log(e);
      return res.status(500).json('Internal Server error');
   }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
   const id = parseInt(req.params.id);
   const response: QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [
      id,
   ]);
   return res.json(response.rows);
};

export const createUser = async (req: Request, res: Response) => {
   const { user_name, user_email } = req.body;
   const response = await pool.query('INSERT INTO users (user_name, user_email) VALUES ($1, $2)', [
      user_name,
      user_email,
   ]);
   res.json({
      message: 'User Added successfully',
      body: {
         user: { user_name, user_email },
      },
   });
};

export const updateUser = async (req: Request, res: Response) => {
   const id = parseInt(req.params.id);
   const { user_name, user_email } = req.body;

   const response = await pool.query(
      'UPDATE users SET user_name = $1, user_email = $2 WHERE id = $3',
      [user_name, user_email, id]
   );
   res.json('User Updated Successfully');
};

export const deleteUser = async (req: Request, res: Response) => {
   const id = parseInt(req.params.id);
   await pool.query('DELETE FROM users where id = $1', [id]);
   res.json(`User ${id} deleted Successfully`);
};