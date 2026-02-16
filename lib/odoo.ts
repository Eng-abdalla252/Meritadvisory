// Odoo JSON-RPC Helper
async function odooCall(service: string, method: string, args: any[]) {
    const ODOO_URL = process.env.ODOO_URL;
    if (!ODOO_URL) throw new Error("ODOO_URL not configured");

    const response = await fetch(`${ODOO_URL}/jsonrpc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            jsonrpc: "2.0",
            method: "call",
            params: { service, method, args },
            id: Math.floor(Math.random() * 1000),
        }),
    });

    const result = await response.json();
    if (result.error) throw new Error(result.error.message);
    return result.result;
}

/**
 * Generic function to execute Odoo methods (search, read, create, write, etc.)
 */
export async function executeOdoo(model: string, method: string, args: any[], kwargs: any = {}) {
    const ODOO_DB = process.env.ODOO_DB;
    const ODOO_USERNAME = process.env.ODOO_USERNAME;
    const ODOO_PASSWORD = process.env.ODOO_PASSWORD;

    try {
        // 1. Authenticate
        const uid = await odooCall("common", "authenticate", [ODOO_DB, ODOO_USERNAME, ODOO_PASSWORD, {}]);
        if (!uid) throw new Error("Authentication failed");

        // 2. Execute
        return await odooCall("object", "execute_kw", [
            ODOO_DB,
            uid,
            ODOO_PASSWORD,
            model,
            method,
            args,
            kwargs,
        ]);
    } catch (error: any) {
        console.error(`Odoo Error [${model}.${method}]:`, error.message);
        throw error;
    }
}

/**
 * Specialized function for leads (legacy support)
 */
export async function createOdooLead(data: any) {
    try {
        const description = `
Intake Form Submission:
-----------------------
Company: ${data.companyName}
Employees: ${data.numEmployees}
Branches: ${data.numBranches}
Cities: ${data.cities}
Interest: ${data.interest}
Industry: ${data.managementIndustry || "N/A"}
Current System: ${data.currentSystem}

Message/Need:
${data.briefNeed}
    `.trim();

        const leadIds = await executeOdoo("crm.lead", "create", [[{
            name: `New Inquiry: ${data.companyName}`,
            contact_name: data.customerName,
            email_from: data.email,
            phone: data.phoneNumber,
            description: description,
            type: "lead",
        }]]);

        return { success: true, lead_id: leadIds[0] };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
