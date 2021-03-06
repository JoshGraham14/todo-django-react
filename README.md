# Todo app using Django and React

The backend of this project was created using Python and the Django Rest Framework. The REST API has CRUD (Create, Read, Update, Delete) functionality.

The frontend was created using React. API calls are made to the backend to load, edit, create, and delete todo items.

# Local setup

1. Clone the repo
2. Open two terminals

#### backend

3. In the first terminal `cd` to the `backend/` directory
4. Run `pip install pipenv` if you don't already have pipenv installed
5. Run `pipenv install` to install the required dependencies
6. Create a .env file with the command `touch .env`
7. Activate the pipenv shell by running `pipenv shell`

You will need to generate a secret key to put into the .env file

9. Run `python -i` to open a python interpreter
10. Run these two lines of code
    - `from django.core.management.utils import get_random_secret_key`
    - `print(get_random_secret_key())`
11. Copy the secret key that is printed, then close the interpreter with `quit()`
12. Open the .env file and add the secret key, as well as a debug value as shown below

```
SECRET_KEY=<secret_key_you_just_generated>
DEBUG=True
```

13. You can now run the server on port 8000 using the command `python manage.py runserver`

#### frontend

14. In your second terminal, `cd` to the `frontend/` directory
15. Run `npm install`
16. Run `npm start` to start the frontend on port 3000

The app should now be running successfully.

### Here is a demonstration of the todo list

<img src="./demo.gif" alt="demo of app running"/>
