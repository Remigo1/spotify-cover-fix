# Как вернуть обложки в Spotify на Windows

Если музыка играет, а вместо обложек видны пустые квадраты, попробуй этот способ. Он перенаправляет запросы картинок на другой сервер Spotify. Обычные обложки после настройки появились на одном ПК. Работа в Fullscreen от daksh2k без Happ пока не подтверждена.

## Установка

1. Установи [Spicetify](https://spicetify.app/docs/getting-started), если его ещё нет.
2. Открой [тестовую обложку](https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02ff9ca10b55ce82ae553c8228) с выключенным VPN. Если она загрузилась, переходи к шагу 4.
3. Открой Блокнот от имени администратора. В меню «Файл → Открыть» вставь путь `C:\Windows\System32\drivers\etc\hosts`. Сохрани копию файла, затем добавь в конец оригинала строку ниже. Если домен уже прописан, не добавляй дубликат. После сохранения снова открой тестовую обложку. Если она всё ещё недоступна, удали добавленную строку и остановись. IP может со временем перестать работать.

   ```text
   146.75.106.250 image-cdn-fa.spotifycdn.com
   ```

4. Открой [spotify-artwork-cdn.js](spotify-artwork-cdn.js) и скачай исходный файл кнопкой **Download raw file**. Нажми **Win + R**, вставь `%APPDATA%\spicetify\Extensions` и положи туда файл. Если папки `Extensions` нет, создай её внутри `%APPDATA%\spicetify`.
5. Открой PowerShell и выполни две команды по очереди.

   ```powershell
   spicetify config extensions spotify-artwork-cdn.js
   spicetify apply
   ```

6. Полностью закрой Spotify, включая значок в трее. Открой его с выключенным VPN и проверь обложку трека, который раньше не отображался.

## Как отменить

В PowerShell выполни:

```powershell
spicetify config extensions spotify-artwork-cdn.js-
spicetify apply
```

Если добавлял строку в `hosts`, удали её и перезапусти Spotify.

[Обсуждение адресов CDN](https://github.com/Flowseal/zapret-discord-youtube/issues/15662) · [Расширения Spicetify](https://spicetify.app/docs/customization/extensions)
