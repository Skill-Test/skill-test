# SkillTest

## Description

The user is having problems registering and accessing his profile.

## Changes/improvements:

Below I write all changes and implement code enhancements that could have an impact on user registration, operations having to do with wallet creation, user profile access or database queries.


1. **Node.js update**.
   
    - Updated Node.js version from 20 to 16.2.
   
    ![image](https://github.com/dn7manz/skill-test/assets/153960298/90696edd-d569-4230-b0d2-4e3b9bb041d0)

3. **Correction in the Server Startup Script**.
   
   - Corrected the statement in the `package.json` file to run the server correctly.
   - there was a syntax error before the syntax was "server": "cd backend & npm start", and it was changed to "server": "cd backend && npm start",
   
   ![image](https://github.com/dn7manz/skill-test/assets/153960298/de7963e7-30e5-42bb-8394-66fb14d923b8)

4. **Discrepancy between frontend and backend**.
   
   - After reviewing exaustivamente of the frontend and the backend, I locate a discrepancy between the registration form of the frontend and the data that is sent to the server through the backend, the discrepancy is that in the invite code field, in the frontend appears as an optional field and in the user data validator (userValidator.middleware.js) appears as required. I found this by testing with Postman, where the following message appears: invite_code is required, we can see it in the following image:
   
   ![image](https://github.com/dn7manz/skill-test/assets/153960298/e413ad49-ab2e-410e-ac14-d24e33df3702)
     
   - To resolve this discrepancy edit the userValidator.middleware.js file the part of the code where it refers to the "invite_code" field to make it optional and not throw an error message when this field is empty.
  
   ![image](https://github.com/dn7manz/skill-test/assets/153960298/88abe56d-c792-4b2d-bb37-6d9fd7c9f26d)
  
   - After making this change, we test again with Postman and we can see that the registration worked successfully without putting invite_code, as we can see in the following image.
  
   ![image](https://github.com/dn7manz/skill-test/assets/153960298/2d4300b7-544b-4586-b1c5-2e522cce72d6)

5. **Modification in Database Configuration**.
   
   - Referencing the previous change, when reviewing the database files, I find that the invite_code field is not allowed null, so I change the field settings in the database to allow the 'null' value and there are no errors when creating a user.

   ![image](https://github.com/dn7manz/skill-test/assets/153960298/d2f19431-c253-462e-97ad-b6b33d93cf94)

   - I have detected that in the field where the data type of the field 'email_verify' is varchar, so it would allow alphanumeric characters, to avoid possible errors we change to type int.
  
   ![image](https://github.com/dn7manz/skill-test/assets/153960298/de6c5357-1b93-4e8f-9fc9-cc2d1b68b3ce)

7. **Implementation of Error Logging with Winston**.
   
   - Winston is a logging library for Node.js, designed to be simple and versatile, while offering powerful features for log management in Node.js applications. It allows developers to record detailed information.
   - To use Winston in the project it is necessary to install the library, with the following command:
     ````npm install winston ```
   - For the correct functioning of the library, I have created a file called Logger in the utils folder, in which I configure what is necessary to save the errors in rachives for later revision.

   ![image](https://github.com/dn7manz/skill-test/assets/153960298/9fc7c01f-2b0a-4e23-831b-fcfe67b8adf9)

   - once configured, in all try/catch sentences, we configure the winston sentence in the catch part so that every time an error occurs in the try, for example an error with the connection with the database, we will be able to register the logs of the errors for later revision in the files configured in the logger file.
     As example in the folder models there are several files that have functions sensitive to errors because they are functions that manipulate or consult data to the database. We can see the sentence that registers the errors in the following images:
     
   ![image](https://github.com/dn7manz/skill-test/assets/153960298/426a3cea-6f44-4e88-b7a5-2fc4aabe74fc)
  
   ![image](https://github.com/dn7manz/skill-test/assets/153960298/2d4d79fa-6a18-4d0d-addc-2f149ca18e0c)
  
   ![image](https://github.com/dn7manz/skill-test/assets/153960298/92fa2af0-e2d7-4488-aae2-027fd8d9d407)

9. **try/catch statements without setting**.
    
   - reviewing the models folder, I found that in the transaction.model.js file there were several error-sensitive functions without the try/catch statements, so if there was a problem with the database, I added these statements where missing.
     
   ![image](https://github.com/dn7manz/skill-test/assets/153960298/c13e7b0a-9129-4752-b7e2-efd3f58c2603)

   ![image](https://github.com/dn7manz/skill-test/assets/153960298/83e25a63-4062-4b2a-9e9b-8f0e0ea3a32b)

11. **Syntax Correction in `emailVerify.model.js`**
    
   - Fixed a syntax error in the `delete` function in the `emailVerify.model.js` file. The DELETE * statement is incorrect in SQL. The correct form is DELETE FROM.

   ![image](https://github.com/dn7manz/skill-test/assets/153960298/17e0bbe5-5065-4cb8-abff-f641bee9510d)

12. **Code cleaning**

    - in different files I have refactored the code so that it is more understandable and the readability is more comfortable for the programmers. These changes have been in the files of the routes/api folder. Here is an example.

    ![image](https://github.com/dn7manz/skill-test/assets/153960298/cb351f62-0fb6-4c9a-a9b0-cc2a73385b24)


    
