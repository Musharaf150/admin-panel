'use client'

import HeaderBox from '@/components/HeaderBox';
import Headercart from '@/components/Headercart';
import Search from '@/components/Search';
import { getAllUsers } from '@/lib/actions/admin.actions';
import { UserProps } from '@/types';
import React, { useEffect, useState } from 'react';



function Users({}:UserProps) {
  const [users, setUsers] = useState<UserProps[]>([]); // Explicitly define the type of users as User[]

  useEffect(() => {
    async function fetchUsers() {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle error in fetching users
      }
    }

    fetchUsers();
  }, []);

  return (
    <>
     <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
          title='Users'/>
        </header>
        
   
      </div>

      <section className="wrapper mt-3">
        <Search placeholder="Search buyer name..." />
      </section>

      <section className="wrapper overflow-x-auto">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Email</th>
              <th className="min-w-[150px] py-3 text-left">First name</th>
              <th className="min-w-[100px] py-3 text-left">Last name</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No Users Founds.
                </td>
              </tr>
            ) : (
              <>
                {users &&
                  users.map((user) => (
                    <tr
                      key={user.clerkId}
                      className="p-regular-14 lg:p-regular-16 border-b "
                      style={{ boxSizing: 'border-box' }}>
                      <td className="min-w-[200px] flex-1 py-4 pr-4">{user.email}</td>
                      <td className="min-w-[150px] py-4">{user.firstName}</td>
                      <td className="min-w-[100px] py-4">
                        {user.lastName}
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
      </section>
    </>

   
  );
}

export default Users;
