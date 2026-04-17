FROM python:3.11-slim

# Unbuffered output for proper logging on Railway
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies for reportlab, Pillow, python-docx
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libc6-dev \
    libjpeg62-turbo-dev \
    zlib1g-dev \
    libfreetype6-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY backend/requirements.txt /app/backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend code
COPY backend/ /app/backend/

# Ensure uploads directory exists
RUN mkdir -p /app/backend/uploads

# Railway provides PORT env var
ENV PORT=5001
EXPOSE $PORT

# Use gunicorn for production (Flask's built-in server is for development only)
CMD gunicorn --bind 0.0.0.0:$PORT --workers 2 --timeout 120 backend.app:app
