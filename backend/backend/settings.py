import os
from pathlib import Path

from dotenv import load_dotenv
from mongoengine import connect

# --------------------------------------------------
# Base Directory
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

# --------------------------------------------------
# Load Environment Variables
# --------------------------------------------------

load_dotenv(BASE_DIR / ".env")

# --------------------------------------------------
# MongoDB Atlas Connection (with error handling)
# --------------------------------------------------

MONGO_URI = os.getenv("MONGO_URI")

if MONGO_URI:
    try:
        connect(host=MONGO_URI)
        print("✅ MongoDB Atlas Connected Successfully!")
    except Exception as e:
        print(f"❌ MongoDB Connection Failed: {e}")
else:
    print("⚠️ MONGO_URI not found in environment variables!")
    print("   Using fallback connection...")
    try:
        connect(
            db="exam_scheduler_db",
            host="mongodb://localhost:27017/exam_scheduler_db"
        )
        print("✅ Connected to local MongoDB")
    except Exception as e:
        print(f"❌ Local MongoDB Connection Failed: {e}")

# --------------------------------------------------
# Django Settings
# --------------------------------------------------

SECRET_KEY = os.getenv("SECRET_KEY", "django-insecure-fallback-key")

DEBUG = os.getenv("DEBUG", "False") == "True"

ALLOWED_HOSTS = [
    "127.0.0.1",
    "localhost",
    ".onrender.com",
]

# --------------------------------------------------
# Installed Apps
# --------------------------------------------------

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'corsheaders',

    'exam_scheduler',
]

# --------------------------------------------------
# Middleware
# --------------------------------------------------

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',

    'django.middleware.security.SecurityMiddleware',

    'whitenoise.middleware.WhiteNoiseMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',

    'django.middleware.common.CommonMiddleware',

    'django.middleware.csrf.CsrfViewMiddleware',

    'django.contrib.auth.middleware.AuthenticationMiddleware',

    'django.contrib.messages.middleware.MessageMiddleware',

    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# --------------------------------------------------
# URLs
# --------------------------------------------------

ROOT_URLCONF = 'backend.urls'

# --------------------------------------------------
# Templates
# --------------------------------------------------

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',

        'DIRS': [],

        'APP_DIRS': True,

        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',

                'django.contrib.auth.context_processors.auth',

                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# --------------------------------------------------
# WSGI
# --------------------------------------------------

WSGI_APPLICATION = 'backend.wsgi.application'

# --------------------------------------------------
# Django Database (Sessions & Auth)
# --------------------------------------------------

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# --------------------------------------------------
# Internationalization
# --------------------------------------------------

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# --------------------------------------------------
# Static Files
# --------------------------------------------------

STATIC_URL = "static/"

STATIC_ROOT = BASE_DIR / "staticfiles"

STATICFILES_DIRS = [
    BASE_DIR / "exam_scheduler" / "static",
]

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# --------------------------------------------------
# Default Auto Field
# --------------------------------------------------

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# --------------------------------------------------
# CORS
# --------------------------------------------------

CORS_ALLOW_ALL_ORIGINS = True

# --------------------------------------------------
# Logging for Debug
# --------------------------------------------------

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
}