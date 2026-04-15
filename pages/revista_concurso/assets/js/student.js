/* ════════════════════════════════════════════════════════════════════
   STUDENT — Gerenciamento de perfil e progresso do aluno
   Persiste tudo em localStorage. Sem dependência de servidor.
   ════════════════════════════════════════════════════════════════════ */

window.Student = (() => {
    'use strict';

    const STORAGE_KEY = 'APROVA_STUDENT';
    const PROGRESS_KEY = 'APROVA_PROGRESS';

    // ── Default student data ────────────────────────────────────────
    function defaultProfile() {
        return {
            name: '',
            email: '',
            phone: '',
            photo: '',           // base64 data-url
            targetConcurso: '',  // id from CATALOG.concursos
            targetBanca: '',     // id from CATALOG.bancas
            selectedAreas: [],   // array of area ids
            selectedSubjects: [],// array of subject ids
            createdAt: '',
            updatedAt: '',
        };
    }

    function defaultProgress() {
        return {
            totalQuestions: 0,
            totalCorrect: 0,
            totalStudyMinutes: 0,
            streak: 0,
            lastStudyDate: '',
            sessionsCount: 0,
            bySubject: {},
            // bySubject[subjectId] = { total, correct, lastStudied, sessions }
            history: [],
            // history[] = { date, subjectId, total, correct, duration }
        };
    }

    // ── Load / Save ─────────────────────────────────────────────────
    function loadProfile() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            return Object.assign(defaultProfile(), JSON.parse(raw));
        } catch { return null; }
    }

    function saveProfile(data) {
        data.updatedAt = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function loadProgress() {
        try {
            const raw = localStorage.getItem(PROGRESS_KEY);
            if (!raw) return defaultProgress();
            return Object.assign(defaultProgress(), JSON.parse(raw));
        } catch { return defaultProgress(); }
    }

    function saveProgress(data) {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
    }

    // ── Profile CRUD ────────────────────────────────────────────────
    function isRegistered() {
        const p = loadProfile();
        return p && p.name && p.name.trim().length > 0;
    }

    function register(formData) {
        const profile = Object.assign(defaultProfile(), formData, {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
        saveProfile(profile);
        return profile;
    }

    function updateProfile(partial) {
        const current = loadProfile() || defaultProfile();
        Object.assign(current, partial);
        saveProfile(current);
        return current;
    }

    function deleteProfile() {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(PROGRESS_KEY);
    }

    // ── Progress tracking ───────────────────────────────────────────
    function recordSession(subjectId, total, correct, durationMinutes) {
        const prog = loadProgress();
        const today = new Date().toISOString().slice(0, 10);

        prog.totalQuestions += total;
        prog.totalCorrect += correct;
        prog.totalStudyMinutes += (durationMinutes || 0);
        prog.sessionsCount++;

        // Streak
        if (prog.lastStudyDate === today) {
            // same day, keep streak
        } else {
            const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
            prog.streak = (prog.lastStudyDate === yesterday) ? prog.streak + 1 : 1;
        }
        prog.lastStudyDate = today;

        // By subject
        if (!prog.bySubject[subjectId]) {
            prog.bySubject[subjectId] = { total: 0, correct: 0, lastStudied: '', sessions: 0 };
        }
        const sub = prog.bySubject[subjectId];
        sub.total += total;
        sub.correct += correct;
        sub.lastStudied = today;
        sub.sessions++;

        // History (keep last 100)
        prog.history.unshift({ date: new Date().toISOString(), subjectId, total, correct, duration: durationMinutes || 0 });
        if (prog.history.length > 100) prog.history.length = 100;

        saveProgress(prog);
        return prog;
    }

    // ── Analytics ───────────────────────────────────────────────────
    function getOverallAccuracy() {
        const p = loadProgress();
        return p.totalQuestions > 0 ? Math.round(p.totalCorrect / p.totalQuestions * 100) : 0;
    }

    function getSubjectAccuracy(subjectId) {
        const p = loadProgress();
        const s = p.bySubject[subjectId];
        return s && s.total > 0 ? Math.round(s.correct / s.total * 100) : null;
    }

    function getWeakSubjects(threshold) {
        threshold = threshold || 60;
        const p = loadProgress();
        return Object.entries(p.bySubject)
            .filter(([, v]) => v.total >= 5 && (v.correct / v.total * 100) < threshold)
            .map(([id, v]) => ({ id, accuracy: Math.round(v.correct / v.total * 100), total: v.total }))
            .sort((a, b) => a.accuracy - b.accuracy);
    }

    function getStrongSubjects(threshold) {
        threshold = threshold || 70;
        const p = loadProgress();
        return Object.entries(p.bySubject)
            .filter(([, v]) => v.total >= 5 && (v.correct / v.total * 100) >= threshold)
            .map(([id, v]) => ({ id, accuracy: Math.round(v.correct / v.total * 100), total: v.total }))
            .sort((a, b) => b.accuracy - a.accuracy);
    }

    function getRecentActivity(days) {
        days = days || 7;
        const p = loadProgress();
        const cutoff = new Date(Date.now() - days * 86400000).toISOString();
        return p.history.filter(h => h.date >= cutoff);
    }

    function getStudyRecommendation() {
        const profile = loadProfile();
        const progress = loadProgress();
        if (!profile) return [];

        const selectedSubjects = profile.selectedSubjects && profile.selectedSubjects.length
            ? profile.selectedSubjects
            : (window.CATALOG ? window.CATALOG.subjects.map(s => s.id) : []);

        return selectedSubjects.map(sid => {
            const sub = progress.bySubject[sid];
            const accuracy = sub && sub.total > 0 ? Math.round(sub.correct / sub.total * 100) : null;
            const meta = window.CATALOG ? window.CATALOG.getSubject(sid) : null;
            let priority = 'medium';
            if (accuracy === null) priority = 'new';
            else if (accuracy < 50) priority = 'critical';
            else if (accuracy < 70) priority = 'high';
            else if (accuracy >= 85) priority = 'low';
            return { id: sid, label: meta ? meta.label : sid, accuracy, total: sub ? sub.total : 0, priority, hasContent: meta ? meta.hasContent : false, hasQuestions: meta ? meta.hasQuestions : false };
        }).sort((a, b) => {
            const order = { critical: 0, high: 1, new: 2, medium: 3, low: 4 };
            return (order[a.priority] || 3) - (order[b.priority] || 3);
        });
    }

    // ── Public API ──────────────────────────────────────────────────
    return {
        loadProfile, saveProfile, loadProgress, saveProgress,
        isRegistered, register, updateProfile, deleteProfile,
        recordSession,
        getOverallAccuracy, getSubjectAccuracy, getWeakSubjects, getStrongSubjects,
        getRecentActivity, getStudyRecommendation,
    };
})();
