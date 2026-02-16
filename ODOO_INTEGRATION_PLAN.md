# Implementation Plan: Full Odoo ERP Integration

This plan outlines the steps to transform the Merit Advisory website into a fully integrated frontend for the Odoo ERP platform, moving beyond CRM to include Recruitment, Helpdesk, and Project Management.

## Phase 1: Core Integration Infrastructure
- [ ] **Unified RPC Utility**: Enhance `lib/odoo.ts` to handle generic operations (Read/Write/Search) for any Odoo model.
- [ ] **Secure Middleware**: Ensure all Odoo headers and authentication are centralized in server-side API routes.

## Phase 2: HR & Recruitment (HR Module)
- [ ] **Dynamic Careers Page**: Create `/careers` page that pulls live job openings from Odoo `hr.job`.
- [ ] **Application Portal**: Build an application form that submits resumes and data directly to Odoo's Recruitment pipeline.

## Phase 3: Customer Support (Helpdesk Module)
- [ ] **Service Ticket Form**: Add a "Technical Support" or "Service Request" form.
- [ ] **Helpdesk Sync**: Connect this form to Odoo's `helpdesk.ticket` model for real-time ticket creation.

## Phase 4: Project Transparency (Project Module)
- [ ] **Project Portfolio Sync**: (Optional) Fetch successful project metadata from Odoo `project.project` for the "Case Studies" section.

## Phase 5: Content & Knowledge (Blog Module)
- [ ] **Odoo Blog Integration**: Fetch blog posts from Odoo `blog.post` to keep the website content updated directly from the ERP.

---

# Execution Log

### Task 1.1: Expanding Odoo Utility
Building a more robust `odoo.ts` to support the expanded module list.
