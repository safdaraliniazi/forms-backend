"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
const dbFilePath = path.join(__dirname, 'db.json');
const readDatabase = () => {
    try {
        const data = fs.readFileSync(dbFilePath, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error(`Error reading database file: ${error.message}`);
        // Initialize with empty submissions array if file doesn't exist or is empty
        return { submissions: [] };
    }
};
const writeDatabase = (data) => {
    try {
        fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
    }
    catch (error) {
        console.error(`Error writing to database file: ${error.message}`);
    }
};
app.get('/ping', (req, res) => {
    res.send(true);
});
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).send({ message: 'All fields are required' });
    }
    const newSubmission = { name, email, phone, github_link, stopwatch_time };
    const db = readDatabase();
    db.submissions.push(newSubmission);
    writeDatabase(db);
    res.status(201).send({ message: 'Submission received' });
});
app.get('/read', (req, res) => {
    const { index } = req.query;
    const idx = parseInt(index, 10);
    if (isNaN(idx) || idx < 0) {
        return res.status(400).send({ message: 'Invalid index' });
    }
    const db = readDatabase();
    if (idx >= db.submissions.length) {
        return res.status(404).send({ message: 'Submission not found' });
    }
    res.status(200).send(db.submissions);
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
