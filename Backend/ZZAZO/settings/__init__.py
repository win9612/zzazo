from .base import *

DEBUG = False


DATABASE_ROUTERS = ['ZZAZO.placeRouter.placeRouter']
DATABASES = {
    # 디폴트에 서버에 올릴 MySQL 적어야 함 
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': NAME,
        'USER': USER,
        'PASSWORD': PASSWORD,
        'HOST': HOST,
        'PORT': '3306'
    },

    'place': {
        'ENGINE': 'djongo',
        'ENFORCE_SCHEMA': False,
        'LOGGING': {
            'version': 1,
            'loggers': {
                'djongo': {
                    'level': 'DEBUG',
                    'propogate': False,                        
                }
            },
         },
        'NAME': 'S07P22B307',
        'CLIENT': {
            'host': HOST,
            'port': 27017,
            'username': USERNAME,
            'password': PASSWORD,
            'authSource': 'admin',
            'authMechanism': 'SCRAM-SHA-1'
        }
    }
}

ALLOWED_HOSTS = []
