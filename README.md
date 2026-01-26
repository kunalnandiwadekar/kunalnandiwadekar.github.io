# My Portfolio Website

A modern, responsive portfolio website built with Django, HTML, CSS, and JavaScript. This dynamic portfolio showcases my projects, skills, and includes a functional contact form.

## Features
- Responsive design that works on all devices
- Interactive UI with smooth animations
- Working contact form with Django backend
- Project showcase with descriptions and links
- About section with skills and experience
- Easy deployment with Django

## Technologies Used
- **Backend**: Django 4.2+
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Database**: SQLite (Development), PostgreSQL (Production-ready)
- **Deployment**: Ready for deployment on platforms like Heroku, PythonAnywhere, or Vercel

## Getting Started

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kunalnandiwadekar/kunalnandiwadekar.github.io.git
   cd kunalnandiwadekar.github.io
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   Create a `.env` file in the project root and add:
   ```
   SECRET_KEY=your-secret-key
   DEBUG=True
   ```

5. Run migrations:
   ```bash
   python manage.py migrate
   ```

6. Create a superuser (optional):
   ```bash
   python manage.py createsuperuser
   ```

7. Run the development server:
   ```bash
   python manage.py runserver
   ```

8. Open your browser and visit `http://127.0.0.1:8000/`

## Project Structure
```
portfolio_project/
├── core/                    # Main app
│   ├── migrations/         # Database migrations
│   ├── static/             # Static files (CSS, JS, images)
│   ├── templates/          # HTML templates
│   ├── __init__.py
│   ├── admin.py           # Admin configuration
│   ├── apps.py            # App config
│   ├── models.py          # Database models
│   ├── urls.py            # App URL routing
│   └── views.py           # View functions
├── portfolio_project/      # Project settings
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py        # Django settings
│   ├── urls.py           # Main URL routing
│   └── wsgi.py
├── .gitignore
├── manage.py
├── README.md
└── requirements.txt
```

## Deployment

This project is ready for deployment on various platforms. Here's how to deploy to PythonAnywhere:

1. Push your code to GitHub
2. Create a PythonAnywhere account and set up a new web app
3. Configure the virtual environment and install requirements
4. Set up the database and run migrations
5. Configure static files and WSGI file
6. Reload your web app

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Kunal Nandiwadekar**  
[GitHub](https://github.com/kunalnandiwadekar) | [LinkedIn](https://linkedin.com/in/kunalnandiwadekar)

## Acknowledgments
- Django Documentation
- Various open-source libraries and templates
