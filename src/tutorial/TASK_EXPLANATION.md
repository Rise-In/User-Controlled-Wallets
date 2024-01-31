# How to Use This Project to Complete Tasks

## Understanding the Project

In this project, you have couple of challanges that you need to complete.

To understand the challanges, let's talk briefly about the process of creating user controlled wallets.

### Steps to Create User Controlled Wallets

Before creating the wallet for the user, there are 4 steps that needs to be completed.

1. Getting the App Id.

- An app id is a unique identifier assigned to your application that allows you to configure and manage various settings specific to your user-controlled wallet integration. The app id is essential for identifying your application and enabling communication with the Circle Platform APIs.

2. Creating a New User

- In this step you create a new user by providing a user id. You will learn more in this topic's lesson.

3. Acquiring Session Token

- You need to obtain a session token for each of your end-users to initiate requests that require a user challenge, such as setting or entering their PIN code. This token will be valid for an hour.

4. Initializing User

- This is the part where we create a wallet for the specified blockchain. After this step, user still need to finish the wallet creation by providing the pin and the recovery question.

### Your Task

Once you run the project with the command `npm run dev`, you will see there are couple of links for the corresponding challange. Once you click on a challange, you will see a brief explanation on the left hand side and a code on the right. Below these, there will be a button and a section where you will retrieve your data from the Circle api.

Solving these challanges will be pretty straight forward, you will copy the code and paste it in the corresponding file. After that, you will be able to click the button and get your response.

In this project, under the src>app>api you will see couple of folders. They are named:

- get_app_id
- create_a_new_user
- acquire_session_token
- initialize_user

In each folder there is a file called, route.js. This is where the magic happens. In these route.js files, you will be making api calls to the corresponding circle api endpoint and retrieve the necessary data for the next step. The rest of the code is already created for you, so that you just need to focus on understanding the code that you will write and retrieve the necessary information.

### .env.local File

In this project and also in real life, you should `never hardcode sensitive information like API keys`. For that reason, we will also be using ``.env.local` file. All you need to do is to create a file called `.env.local` in the root of this project. After creating the file, enter your api key like the following:

`NEXT_PUBLIC_API_KEY=<your api key>`

You should not use "" when typing your key, simple just replace `<your api key>` part with the api key that you have created on the circle website.

Finally after retrieveing your data from the api call, create another variable like the one you have created for you api key and save the variable in the file.
