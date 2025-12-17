import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = os.environ.get('FLASK_DEBUG', 'False') == 'True'

    # Session configuration
    SESSION_TYPE = 'filesystem'
    SESSION_PERMANENT = False

    # Database
    DATABASE = 'flowers.db'
