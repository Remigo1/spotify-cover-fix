# Как вернуть обложки в Spotify на Windows

Если треки играют, а обложки пропали, попробуй этот фикс для Spicetify. У меня после него обложки в плеере появились. В Fullscreen от daksh2k результат пока под вопросом.

## Как поставить

1. Если у тебя ещё нет Spicetify, [установи его по инструкции](https://spicetify.app/docs/getting-started).
2. Открой [тестовую обложку](https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02ff9ca10b55ce82ae553c8228). Если картинка открылась, переходи сразу к шагу 4.
3. Запусти Блокнот от имени администратора и через **Файл → Открыть** открой файл `C:\Windows\System32\drivers\etc\hosts`. Сделай копию файла, затем добавь в конец оригинала эту строку.

   ```text
   146.75.106.250 image-cdn-fa.spotifycdn.com
   ```

   Сохрани файл и снова открой тестовую обложку. Если она всё равно не грузится, убери добавленную строку. Этот адрес со временем может перестать работать.

4. Открой [spotify-artwork-cdn.js](spotify-artwork-cdn.js) и нажми **Download raw file**. Через **Win + R** открой `%APPDATA%\spicetify\Extensions` и положи скачанный файл туда. Если папки `Extensions` нет, создай её в папке `spicetify`.
5. Открой PowerShell и выполни по очереди:

   ```powershell
   spicetify config extensions spotify-artwork-cdn.js
   spicetify apply
   ```

6. Закрой Spotify через значок рядом с часами, открой снова и проверь трек, у которого раньше не было обложки.

## Как убрать фикс

В PowerShell выполни:

```powershell
spicetify config extensions spotify-artwork-cdn.js-
spicetify apply
```

Если добавлял строку в `hosts`, удали её. Затем перезапусти Spotify.

[Откуда взят адрес сервера обложек](https://github.com/Flowseal/zapret-discord-youtube/issues/15662) · [Документация по расширениям Spicetify](https://spicetify.app/docs/customization/extensions)
