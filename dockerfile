# -------------------------------
# Stage 1: Build stage
# -------------------------------
FROM python:3.10-slim-buster AS builder

WORKDIR /app

# ✅ Copy requirements.txt into the container
COPY requirements.txt /app/

# ✅ Install dependencies in build stage
RUN pip install --no-cache-dir -r requirements.txt


# -------------------------------
# Stage 2: Final stage
# -------------------------------
FROM python:3.10-slim-buster

WORKDIR /app

# ✅ Copy installed dependencies from builder
COPY --from=builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=builder /usr/local/bin/gunicorn /usr/local/bin/gunicorn

# ✅ Copy your app source code
COPY . /app/

# ✅ Expose port
EXPOSE 8000

# ✅ Correct CMD syntax (use double quotes properly)
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]
