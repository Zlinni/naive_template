FROM 1195494025/node-pnpm:16.17.1-8.6.0 AS builder 
ENV PROJECT_ENV production

# 设置时区为北京时间
ENV TZ=Asia/Shanghai \
    DEBIAN_FRONTEND=noninteractive

RUN ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime 
RUN date

# 使用缓存
WORKDIR /code
ADD package.json pnpm-lock.yaml /code/
RUN pnpm config set registry https://registry.npmmirror.com/
RUN pnpm install
RUN pwd && ls

ADD . /code
RUN pnpm run build:test 

FROM nginx  
COPY --from=builder /code/dist/ /usr/share/nginx/html  
COPY --from=builder /code/deploy/nginx/nginx.conf /etc/nginx/conf.d/default.conf  

# 不使用缓存
# WORKDIR /code
# ADD . /code
# RUN pnpm install
# RUN pnpm run build:test 