#Stage 1:Build stage 

FROM python:3.10-slim-buster AS builder 


WORKDIR /app

COPY requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

#Stage 2: Final stage

FROM python:3.10-slim-buster 

WORKDIR /app

COPY --from=builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10
COPY --from=builder /usr/local/bin/gunicorn /usr/local/bin/gunicorn

COPY ..

EXPOSE 8000

CMD ['gunicorn", "--bind", "0.0.0.0:8000","app:app"]