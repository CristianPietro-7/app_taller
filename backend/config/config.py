from dotenv import load_dotenv
import os

load_dotenv()

env = os.getenv('FLASK_ENV', 'development')
print(env)
load_dotenv(f'.env.{env}')

user = os.getenv("MYSQL_USER")
password = os.getenv("MYSQL_PASSWORD")
host = os.getenv("MYSQL_HOST")
port = os.getenv("MYSQL_PORT", "3307")
database = os.getenv("MYSQL_DB")

DATABASE_CONNECTION_URI = f"mysql+pymysql://{user}:{password}@{host}:{port}/{database}"