/**
 * API Configuration and utilities for portfolio backend
 */

// Backend API base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Download resume PDF file
 * @returns {Promise<void>}
 */
export const downloadResume = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/resume`);

        if (!response.ok) {
            throw new Error("Failed to fetch resume");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Sakshi_Waitage_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error downloading resume:", error);
        throw error;
    }
};

/**
 * Open resume in a new tab
 * @returns {void}
 */
export const viewResume = () => {
    window.open(`${API_BASE_URL}/api/resume/view`, "_blank");
};

/**
 * Check backend health
 * @returns {Promise<boolean>}
 */
export const checkBackendHealth = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        return response.ok;
    } catch (error) {
        console.error("Backend health check failed:", error);
        return false;
    }
};
