# Community Enhancer

A cross-browser extension (Chrome & Firefox) designed to enhance the browsing experience on popular communities like **dogdrip.net** and **fmkorea.com**. This tool allows you to count user appearances and attach personal memos to specific users.

## 🌟 Features

- **Multi-Site Support**:
  - Works on **Dogdrip.net** (Post filtering, Appearance counting).
  - Works on **FMKorea.com** (Future development).
- **User Identification**: Extracts unique member IDs from post authors and commenters.
- **Appearance Counting**: Counts user appearance frequency in valid post sections.
- **Personal Memos**: Save private notes for specific users using local storage.
- **Cross-Browser Support**: Utilizes `webextension-polyfill` for standardized `browser` API usage.

## 📂 Project Structure

```text
.
├── manifest.json              # Extension configuration (Manifest V3)
├── popup.html                 # Extension popup interface
├── images/                    # Icon assets
│   ├── monitor_16.png
│   ├── monitor_48.png
│   └── monitor_128.png
└── scripts/
    ├── browser-polyfill.min.js # Mozilla WebExtension Polyfill
    ├── dd.js                   # Logic for Dogdrip
    └── fmk.js                  # Logic for FMKorea
```
## 🚀 Installation (Developer Mode)

### Prerequisites
1. Clone or download this repository.
2. Download `browser-polyfill.min.js` from the [Mozilla WebExtension Polyfill](https://github.com/mozilla/webextension-polyfill) repository and place it in the `scripts/` directory.

### For Chrome / Edge / Brave
1. Navigate to `chrome://extensions`.
2. Enable **Developer mode** at the top right corner.
3. Click **Load unpacked**.
4. Select the project folder.

### For Firefox
1. Navigate to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on...**.
3. Select the `manifest.json` file from the project folder.

## 🛠 Tech Stack

- **JavaScript (ES6+)**: Async/Await syntax.
- **Manifest V3**: Compliant with the latest extension standards.
- **WebExtension APIs**: `storage.local` for persistent data.

## 📝 Notes

- **Data Persistence**: This extension uses the browser's local storage. Clearing extension data will remove your memos and tracking history.
- **Permissions**: Requires `storage` permission to save user data locally.

## 📄 License

This project is for personal educational purposes.