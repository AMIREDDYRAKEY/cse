import { Note, Syllabus, Event, Contact, QuestionPaper } from "../models.js";
import { DataProvider } from "../dataProvider.js";
import { sendContactEmail } from "../utils/email.js";

const noteService = new DataProvider(Note, "notes.json");
const syllabusService = new DataProvider(Syllabus, "syllabus.json");
const eventService = new DataProvider(Event, "events.json");
const contactService = new DataProvider(Contact, "contacts.json");
const questionPaperService = new DataProvider(QuestionPaper, "questionPapers.json");

export const setServicesDbStatus = (status) => {
    noteService.setDbReady(status);
    syllabusService.setDbReady(status);
    eventService.setDbReady(status);
    contactService.setDbReady(status);
    questionPaperService.setDbReady(status);
};

// Generic Controller Factory
const createController = (service) => ({
    getAll: async (req, res) => {
        try {
            const items = await service.getAll();
            res.json(items);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    create: async (req, res) => {
        try {
            const item = await service.create(req.body);
            res.status(201).json(item);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            await service.delete(req.params.id);
            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
});

export const noteController = createController(noteService);
export const syllabusController = createController(syllabusService);
export const eventController = createController(eventService);
export const questionPaperController = createController(questionPaperService);

const baseContactController = createController(contactService);
export const contactController = {
    ...baseContactController,
    create: async (req, res) => {
        try {
            const item = await contactService.create(req.body);
            // Non-blocking email send
            sendContactEmail(req.body);
            res.status(201).json(item);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};
