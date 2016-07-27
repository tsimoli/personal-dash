FROM trenpixster/elixir

ENV VERSION 0.0.51
ENV MIX_HOST 8888
ENV APPLICATION=personal_dash
EXPOSE $MIX_HOST

RUN mkdir /app
WORKDIR /app
COPY ./rel/$APPLICATION/releases/$VERSION/$APPLICATION.tar.gz /app/$APPLICATION.tar.gz
RUN tar -zxvf $APPLICATION.tar.gz

WORKDIR /app/releases/$VERSION
ENTRYPOINT ["./personal_dash.sh"]
CMD ["foreground"]