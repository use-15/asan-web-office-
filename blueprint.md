# Asan Office — Web App Blueprint (Browser-Based / PWA Edition)

## Product Overview
Asan Office is a high-performance office suite re-architected to run entirely in the browser, offline-first, with no backend server and no cloud dependency. It provides feature parity with Microsoft Office and Adobe Acrobat.

**Core Components:**
*   **Asan Word:** Word processor
*   **Asan Sheet:** Spreadsheet
*   **Asan Slide:** Presentation
*   **Asan PDF:** PDF editor/viewer

**Platform:**
*   Single web app running in any modern browser (Chrome, Edge, Firefox, Safari).
*   Installable as a PWA (Progressive Web App).
*   Fully offline after first load via Service Worker caching.
*   No native installers or app store dependencies.

**File I/O:**
*   Comprehensive import/export: DOCX, DOC, ODT, RTF, TXT, XLSX, XLS, CSV, ODS, PPTX, PPT, ODP, PDF, PDF/A, EPUB, HTML, Markdown, XML.
*   Handled entirely client-side by WASM-compiled parsing libraries.
*   Files open/save via File System Access API (where supported) or standard download/upload fallbacks.

---

## 1. Asan Word — Feature List

### Basic Editing
*   Typing, delete, select, copy, cut, paste (formatting preservation).
*   Undo/Redo (500+ actions).
*   Find and replace (regex, case sensitivity, whole word).
*   Insert symbols, emojis, special characters.
*   AutoCorrect (capitalization, typos, custom entries).
*   Spell check (50+ languages, custom dictionaries, local WASM/Hunspell).
*   Grammar check (local-only style, punctuation, tense).
*   Word count, Zoom (10%–500%).

### Formatting
*   **Character:** Font family, size, color, Bold, Italic, Underline, Strikethrough, Super/Subscript, Small/All caps, Highlight, Spacing, Text effects (shadow, glow, etc.).
*   **Paragraph:** Alignment, Line spacing, Spacing before/after, Indentation (left, right, first line, hanging), Tabs (with leaders), Bullets and numbering (multi-level), Borders and shading, Pagination controls (widow/orphan, keep with next).

### Layout & Styles
*   **Page Layout:** Margins, Orientation, Paper size (A0–A6, Letter, etc.), Columns, Page borders, Line numbering, Hyphenation, Watermarks.
*   **Headers & Footers:** Different first page/odd/even, Page numbers, Insert fields (date, author, etc.), Section breaks.
*   **Styles & Themes:** Predefined styles (Heading 1-9, etc.), Create/Modify/Delete styles, Style inheritance, Document themes.

### Objects & Tables
*   **Tables:** Insert, resize, merge/split, borders/shading, text direction, cell margins, sort, formulas, repeat headers, convert to/from text.
*   **Graphics:** Images (JPG, PNG, GIF, SVG, etc.), Image adjustments (brightness, crop, wrapping, position), Shapes, Text boxes (linked), WordArt, SmartArt (135+ layouts), Charts, 3D Models (GLB, FBX, OBJ via WebGL), Icons.
*   **Screenshot:** via `getDisplayMedia()`.

### Advanced Features
*   **References:** TOC, Footnotes/Endnotes, Citations & Bibliography (APA, MLA, etc.), Table of Figures, Cross-references, Index, Table of Authorities.
*   **Reviewing:** Track changes, Comments (threaded), Compare/Combine documents, Restrict editing, Digital signatures (Web Crypto API).
*   **Mail Merge:** Recipients from Sheet/CSV/vCard, Merge fields, Rules.
*   **Macros & Automation:** JS-based sandboxed macros, Script editor, VBA-to-JS import shim.
*   **Accessibility:** Alt text, Accessibility checker, Read aloud (TTS via Web Speech/WASM).
*   **Others:** Master documents, Forms, Equation editor (LaTeX), Ink drawing, Password encryption (AES-256), AutoSave (IndexedDB/OPFS).

---

## 2. Asan Sheet — Feature List

### Basic Spreadsheet
*   1,048,576 rows × 16,384 columns (Excel-compatible).
*   Virtualized, canvas-based grid rendering.
*   Cell entry (text, numbers, dates, booleans, errors).
*   AutoFill (drag handle).
*   Sheet management (insert, delete, hide, rename, move/copy).
*   Cell formatting (wrap, merge, borders, colors).

### Formulas & Functions
*   450+ functions (Pure WASM/JS evaluation in Web Worker).
*   Text, Math, Statistical, Logical, Lookup & Reference, Date & Time, Financial, Engineering, Information.
*   Array formulas (dynamic arrays, spill ranges).
*   LAMBDA and LET functions.

### Data Management
*   Sort & Filter (multi-level, by color, advanced filters).
*   Data validation.
*   Remove duplicates, Text to columns, Consolidate.
*   What-If Analysis (Goal Seek, Scenario Manager).
*   Group and outline, Subtotals.

### PivotTables & Charts
*   **PivotTables:** Rows, Columns, Values, Filters; Value field settings; Grouping; Calculated fields; Slicers and Timelines.
*   **Charts:** 85+ chart types (Column, Bar, Line, Pie, Area, Scatter, Bubble, Radar, Stock, Surface, Treemap, Sunburst, etc.).
*   **Customization:** Titles, axes, legends, trendlines, error bars.
*   **Sparklines.**

### Advanced Features
*   **Conditional Formatting:** Highlight rules, Top/Bottom, Data bars, Color scales, Icon sets, Formula-based.
*   **Data Analysis:** Solver, Analysis ToolPak.
*   **Collaboration:** Shared local folder access (File System Access API), Workbook merging, Comments/Notes.
*   **Security:** Protect sheet/workbook, Allow edit ranges.
*   **Power Query-style:** Data transformation from local files/databases.
*   **Speech Recognition:** Offline WASM model for dictation.

---

## 3. Asan Slide — Feature List

### Slides & Content
*   Slide master, Layouts, Duplicate/Delete, Sections.
*   Slide size (4:3, 16:9, Custom).
*   **Content:** Text boxes, WordArt, Pictures, Shapes, Icons, 3D models, SmartArt, Charts, Tables.
*   **Multimedia:** Video (MP4, AVI, MOV, etc. via ffmpeg.wasm), Audio (MP3, WAV, M4A).
*   Equations, Symbols.

### Animations & Transitions
*   **Animations:** Entrance, Emphasis, Exit effects; Motion paths; Animation Pane; Timings/Triggers.
*   **Transitions:** Subtle, Exciting, Dynamic (including Morph); Duration/Sound settings.

### Presenter Tools
*   Slide show from beginning/current.
*   Presenter view (multi-display via Presentation API).
*   Annotation tools (pen, highlighter, laser pointer).
*   Record slide show (MediaRecorder/WebCodecs).

### Advanced Features
*   **Media & Export:** Compress media, Trim/Fade video, Export as Video (WebCodecs), GIF, or self-contained HTML/JS bundle.
*   **Reviewing:** Comments, Compare presentations, Digital signatures.
*   **Customization:** Color/Font themes, Background styles, Templates.
*   **Interaction:** Action buttons, Object embedding (Word/Sheet/PDF previews), Slide zoom.
*   **Accessibility:** Checker, Alt text, Real-time subtitles (Offline WASM).

---

## 4. Asan PDF — Feature List

### Viewing & Navigation
*   Read modes, Zoom controls, Thumbnails/Bookmarks panels.
*   Rotate view, Split view.
*   Read aloud, Dark mode.

### Editing
*   **Text:** Edit, add, delete, font/size controls, Find/Replace, Spell check, Flow text.
*   **OCR:** Tesseract.js (WASM) for searchable/editable text.
*   **Images/Objects:** Add, replace, crop, rotate, extract, align, group, layer order.

### Annotations & Forms
*   **Markup:** Highlight, Underline, Redaction, Sticky notes, Drawing tools, Stamps, Attach files, Audio comments, Measure tool.
*   **Forms:** Field types (Text, Checkbox, Radio, Dropdown, Signature, Barcode), Field properties, Calculations, Submit/Reset actions, JavaScript logic.

### Creation & Conversion
*   **Creation:** From image/scanner (WebUSB/eSCL), Multiple files (merge), Clipboard, Web page, Blank page.
*   **Export to:** Word, Excel, PowerPoint, HTML, Text, Image, XML, CSV, AutoCAD.
*   **Import from:** All major office formats + AutoCAD/Visio.

### Security & Optimization
*   Password security, Permissions.
*   Certificate security (Web Crypto API).
*   Redaction (Permanent removal, pattern searching).
*   Sanitize document, Digital signatures.
*   **Optimization:** Reduce file size, Optimize scanned pages, Preflight validation, Repair corrupt PDF.

---

## 5. Development Considerations

### Architecture
*   **Frontend:** React shell with custom Canvas/WebGL rendering engines for each document surface.
*   **Core Engine:** Rust compiled to WebAssembly (Shared for parsing, formula engine, OCR).
*   **Storage:** IndexedDB (Metadata/Prefs) + Origin Private File System (OPFS) (Large binary data).
*   **Offline-first:** Service Worker for caching app bundle, WASM, and models.
*   **Concurrency:** Web Workers for heavy lifting (Formulas, OCR, Video, Macros).
*   **Rendering Parity:** Potential use of CanvasKit (Skia-on-WASM) for pixel-perfect results.

### Key Technical Challenges
1.  Full DOCX/XLSX/PPTX/PDF parsing and rendering entirely in WASM.
2.  Browser memory ceilings (Virtualization for large files).
3.  Uneven browser API support (File System Access API vs. upload/download fallbacks).
4.  Strictly offline speech/OCR (Whisper.cpp/Vosk).
5.  JS-based macro engine in Web Workers (no VBA/COM).
6.  Pure-web digital signatures and certificate handling.
7.  Internal print rendering before browser hand-off.

### Distribution
*   Static assets (HTML/JS/WASM) served via CDN or local network.
*   Installable as PWA.
*   Updates via Service Worker lifecycle.
*   Optional Electron/Tauri wrapper for deeper OS integration.
