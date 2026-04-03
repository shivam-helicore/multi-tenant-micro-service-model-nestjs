# DIGIPHARMed 2.0 — Role-Wise User Roles & User Stories

**Source Documents Analysed:**
- System_requiremnets_digipharma_2.0.pdf (SRS v2.0)
- HPR-NHA Process (Pharmacists Registration on digipharmed).docx.pdf
- 10-SIF COMPLETE PROCESS_Commented.docx.pdf

---

## Overview of the System

DIGIPHARMed is the flagship digital portal of the **Pharmacy Council of India (PCI)**. It governs registration, approval, and tracking of pharmacy institutions, students, and faculty across India. The system is role-based and covers the following primary modules:

- Institute Module
- Student Module
- Faculty / PRTS (Pharmacist Registration Tracking System) Module
- Inspector Module
- Job Portal
- PCI Internal Workflow (Verification, Scrutiny, Inspection, Decision)

---

## Roles Identified in the System

| Role | Type | Description |
|------|------|-------------|
| Institute | External | Pharmacy colleges/institutions seeking PCI approval |
| Student | External | Pharmacy students enrolled in approved institutions |
| Faculty / PRTS | External | Faculty members and registered pharmacists |
| Job Seeker | External | Faculty/Students seeking pharmacy jobs via job portal |
| Employer | External | Organizations posting pharmacy jobs |
| Verifier | PCI Internal | PCI official who verifies institute documents |
| Scrutinizer | PCI Internal | PCI official who scrutinizes applications |
| Inspector | PCI Internal | PCI official who conducts physical inspections |
| Registrar | PCI Internal | Registers decisions from the President |
| Assistant Registrar (AR) | PCI Internal | Reviews and approves decisions before forwarding |
| President | PCI Internal | Highest authority; writes final decisions |
| Admin | System | Manages Job Portal users and data |
| IT Team | System | Manages system access, accounts, security |
| SPC (State Pharmacy Council) | External Authority | Verifies pharmacist credentials per state |

---

---

## 1. Institute Role

### What an Institute Does in the System

An Institute (pharmacy college/institution) is an **external stakeholder** that uses the DIGIPHARMed portal to register, submit annual inspection forms (SIF), pay regulatory charges, and receive approval decisions from PCI.

---

### User Stories — Institute

#### Registration & Login
- As an Institute, I can register on the DIGIPHARMed portal by providing institute name, username, password, mobile, email, organisation, state, and pin code.
- As an existing Institute, I can log in using existing credentials to fill or update my SIF.
- As a new Institute, I am eligible to access all SIF forms and receive a PCI code only after paying the registration fee.
- As an Institute, I can recover my account through the Login Issue support page.

#### Course & Programme Selection
- As an Institute, I can select courses currently conducted and add new courses by clicking "Add New Course" and filling the required fields.
- As an Institute, my institute name is auto-populated in the application form.
- As a Government Institute, I can apply for all courses at once; as a Private Institute, I can apply for a maximum of 2 courses at a time.
- As an Institute, I can select the Academic Year for each applied programme.

#### SIF Form Filling (Standard Inspection Format)
- As an Institute, I must fill and submit the SIF form through the PCI web portal for grant of approval.
- As an Institute, I can fill the following SIF sections:
  - **Affiliation Fee Paid** — enter course-wise regulatory charges and payment proof.
  - **Admission Details** — enter sanctioned intake and actual admissions for past years (existing institutes only).
  - **Examining Authority** — select the examining authority for each course; add new authority if not listed.
  - **Accreditation Information** — provide NAAC/NBA accreditation details and upload certificates.
  - **Infrastructure Details** — enter infrastructure available along with proof documents.
  - **Number of Class Rooms** — enter available classrooms (required numbers auto-populated by PCI).
  - **Laboratory Details** — enter number of labs available, department-wise; gas, water, electricity supply.
  - **Common Facilities** — enter available common infrastructure and compliance with norms.
  - **Computer & Other Facilities** — enter available computers and area.
  - **Amenities Details** — enter amenity counts and areas.
  - **Curriculum** — confirm if PCI curriculum is adopted; provide reason if not; upload events calendar and timetable.
  - **Class Conduct** — enter hours conducted for Theory, Practical, Tutorial.
  - **Academic / Establishment Expenditure** — enter budget details for past years.
  - **Income & Expenditure** — enter income/expenditure, bank account details, upload audited accounts.
  - **Tax Details** — enter tax information manually.
  - **Library** — enter titles available, volumes, number of journals (required numbers auto-populated).
  - **Physical Infrastructure** — enter details of own/rented building, rooms, fire safety certificate, property tax certificate.
  - **Equipment** — enter department-wise equipment details and generate QR/barcodes for each item.
  - **Workshops / Seminars / Guest Lectures** — enter past year workshop details.
  - **Research Papers Presented** — enter faculty/student research paper details.
  - **Extension & Outreach Programs** — enter outreach activity details.
  - **Sports** — indicate availability of sports facilities; enter physical director details and sports activity records.
  - **Anti-Ragging Cell** — enter chairperson name, number of meetings, upload constitution order.
  - **Gender Sensitization Cell** — enter cell details as per SAKSHAM guidelines.
  - **Anti-Discrimination Cell** — enter chairperson and meeting details.
  - **Placement & Career Guidance Cell** — enter placement officer details and student participation counts.
  - **Information on College Website** — provide Yes/No status for required disclosures.
  - **Statutory Documents** — upload Affiliation from Examining Authority, NOC/Approval from State Govt.
  - **Court Cases** — declare if any court cases are pending.
  - **Additional Information** — provide any additional details as required.
- As an Institute, all mandatory fields are marked with a red star (*); the system prevents submission without filling them.
- As an Institute, once all SIF sections are filled, each tab turns green to indicate completion.

#### Room & Lab Registration (Infrastructure Tracking)
- As an Institute, I can register each classroom with details like program, room name, functional date, area, latitude/longitude, and images (inside & outside).
- As an Institute, I can generate and print a barcode for each registered room to physically affix on the wall.
- As an Institute, I can register labs with department name, program, area, and images, and generate a QR code for each lab.
- As an Institute, I can register common facilities and other amenities similarly with QR/barcode generation.

#### Research & Publications
- As an Institute, I can submit PG/PhD project details including supervisor, candidate, duration, and thesis title.
- As an Institute, I can track completed projects, ongoing projects, research collaborations, publications, consultancy services, and patents.

#### Hospital Details (for Pharm.D programmes)
- As an Institute offering Pharm.D, I can enter hospital details, ancillary staff, unit-wise medical staff, and academic activities of Pharm.D students at the hospital.

#### Payment
- As an Institute, I can make payments for PCI Regulatory Charges (PERC) online through the integrated payment gateway.
- As an Institute, I receive confirmation of successful payment which is reflected as payment status.
- As an Institute, if a payment fails, I am notified and can retry from the payment screen.
- As an Institute, all payment history and transaction details are maintained in the portal.

#### Faculty Management
- As an Institute, I can view all registered faculty members in my dashboard.
- As an Institute, I can accept or reject faculty members who have registered and linked themselves to my institution.
- As an Institute, I can edit faculty email ID and mobile number from the SIF Faculty Tool.

#### Services Dashboard
- As an Institute, I can request the following changes through the portal:
  - Change in the name of institute/trust
  - Change of Examining Authority
  - Change in address/location
  - Change of hospital
  - Closure of a course
  - Closure of the institution

#### Compliance & Resubmission
- As an Institute, I can resubmit the SIF form if returned by the Scrutinizer or Verifier.
- As an Institute, I must submit compliance documents within the given time if raised by the Verifier.
- As an Institute, if compliance is not submitted in time, a "compliance not submitted" checklist is shown.

#### Decisions & Appeals
- As an Institute, I can view all PCI decisions regarding my application after login.
- As an Institute, I can download the decision document at any time without restrictions (post-login).
- As an Institute, I can file an **Appeal** against any PCI decision I consider incorrect.
- As an Institute, I am notified of the outcome of my appeal once a decision is made.

---

---

## 2. Student Role

### What a Student Does in the System

A Student is an **external stakeholder** who registers on the DIGIPHARMed portal to maintain their academic profile. Students are one of the approximately 250,000 beneficiaries of the system.

---

### User Stories — Student

#### Registration & Login
- As a Student, I can register on the DIGIPHARMed portal by selecting the "Registered As: Student" option and providing personal information.
- As a Student, my details are stored in the database upon successful registration.
- As a Student, I can log in using my username and password.
- As a Student, I receive a help guide the first time I log in explaining how the system works.

#### Profile Management
- As a Student, I can maintain my profile with accurate personal information.
- As a Student, I must capture and store my academic details (course, institution, year, etc.) during registration.

#### Job Portal Access (as Job Seeker)
- As a Student registered on DIGIPHARMed, I can access the **Job Portal** directly using my existing credentials (no separate registration required).
- As a Student/Job Seeker, I can:
  - Search for pharmacy jobs by category or keyword.
  - Create a résumé using the portal's built-in résumé maker.
  - Apply for jobs posted by employers.
  - Track the status of my job applications.
  - Ask questions about jobs or interview processes to the employer.
  - Update my profile and skills.
  - Receive notifications from employers.

---

---

## 3. Admin Role

### What an Admin Does in the System

The **Admin** role manages the **Job Portal** component of DIGIPHARMed. Admins are system-level operators responsible for maintaining data integrity, user accounts, and job listings.

---

### User Stories — Admin (Job Portal)

#### User Management
- As an Admin, I can add new job seekers or recruiters to the system.
- As an Admin, I can activate or deactivate job seeker and recruiter accounts.
- As an Admin, I can delete job seeker or recruiter accounts.
- As an Admin, I can update job seeker and recruiter information.
- As an Admin, I can change the pending status of recruiters (approve/reject recruiter registration).
- As an Admin, I can send messages to any job seeker or recruiter.

#### Job Management
- As an Admin, I can view all job applications submitted for each posted job.
- As an Admin, I can activate, deactivate, edit, or delete job postings.

#### System Management
- As an Admin, I manage the Job Portal database.

---

---

## 4. Additional Internal PCI Roles (Admin-Level)

These roles are held by PCI officials and form the internal workflow for institution approval.

---

### Verifier

- As a Verifier, I can view all institute applications and documents submitted.
- As a Verifier, I can put comments on submitted documents.
- As a Verifier, I can raise a compliance requirement against an institute if documents are incomplete.
- As a Verifier, I can forward an application for inspection or mark it as overridden.
- As a Verifier, I can verify and approve office notes prepared by the Scrutinizer.
- As a Verifier, I can review and comment on the Registrar-approved decision before it goes to the Scrutinizer.

---

### Scrutinizer

- As a Scrutinizer, I can view the list of all submitted institute applications.
- As a Scrutinizer, I can return the application to the institute if documents are not up to the mark.
- As a Scrutinizer, I can forward the application to the Verifier if documents are satisfactory.
- As a Scrutinizer, I can recommend an institute for physical inspection.
- As a Scrutinizer, I can prepare the internal office note after inspection.
- As a Scrutinizer, I can verify the final decision and send it to the institute.

---

### Inspector

- As an Inspector, I can approve or reject an institute for physical inspection.
- As an Inspector, I conduct site inspections for institutes.

---

### President

- As the President, I have a dedicated dashboard showing all pending decisions.
- As the President, I can write the final decision for any institute.
- As the President, I can override any system or lower-authority decision.

---

### Registrar / Assistant Registrar (AR)

- As a Registrar, I can view the President's written decision and add comments against it.
- As an AR, I can approve the Registrar-commented decision and forward it to the Verifier.

---

### IT Team / System Admin

- As an IT Team member, I can maintain access control and provide individual/group access to LAN/WAN resources.
- As an IT Team member, I can register new users and delete existing accounts as per PCI's request.
- As an IT Team member, I can assign and change user passwords.
- As an IT Team member, I can implement password complexity policies.
- As an IT Team member, I can enforce Web Single Sign-On, OTP management for critical transactions, and Digital Signature for document signing.

---

---

## 5. Faculty / PRTS Role

### What a Faculty Member Does in the System

Faculty (pharmacists registered under PRTS) register independently on the portal, undergo a multi-step verification process, and get linked to institutes after approval.

---

### User Stories — Faculty / PRTS

#### Registration (New Users)
- As a Faculty member, I can register by selecting "Registered As: Faculty" and providing personal and professional information.
- As a Faculty member, I must enter my State Pharmacy Council (SPC) details (name, registration number, DOB, state) for automated matching.
- As a Faculty member, I must verify my identity via **Aadhaar OTP**.
- As a Faculty member, I must select my HPR ID and upload required documents:
  - SPC Registration Certificate (mandatory)
  - Marriage Certificate / Gazette Notification (if name differs between Aadhaar and SPC certificate)
- As a Faculty member, I receive a BH-P Number and HPR ID upon successful registration.
- As a Faculty member, if my SPC details match automatically, my HPR card is generated and available in My Profile.
- As a Faculty member, if SPC details do not match, I wait for manual verification by the SPC representative.
- As a Faculty member, I am allowed to resubmit up to 2 times if rejected by SPC; on the 3rd rejection, my account is blocked.

#### Profile Completion
- As a Faculty member, I must complete my full profile post-registration within the stipulated time or risk account blocking.
- As a Faculty member, I upload the following documents in my profile:
  - Qualification Certificate
  - Appointment Letter
  - Recent Pay-slip
  - Recent Transfer Order (if applicable)

#### Institute Linkage
- As a Faculty member, I register my details separately and they appear in the institute's dashboard.
- As a Faculty member, I must be accepted by the institute before my details reflect in the SIF.
- As a Faculty member, my joining, relieving, salary, workload, and retention details are tracked in the system.

#### Job Portal Access (as Job Seeker)
- As a Faculty member registered on DIGIPHARMed, I can access the Job Portal using the same credentials.
- I can apply for jobs, search by skill/category, create a résumé, and track applications.

---

---

## 6. Employer Role (Job Portal)

### User Stories — Employer

- As an Employer, I can register via the DIGIPHARMed portal.
- As an Employer, I can post jobs with detailed job descriptions.
- As an Employer, I can search resumes/CVs by keywords and job category.
- As an Employer, I can create and edit my company profile.
- As an Employer, I can view the number of applications and vacancy viewings per job posting.
- As an Employer, I can see how much time is left on each job posting and CV access period.
- As an Employer, I can view submitted job seeker profiles and search CVs.
- As an Employer, I can change my password.

---

---

## Summary Table — Role vs. Key Capabilities

| Capability | Institute | Student | Faculty | Admin | Verifier | Scrutinizer | President |
|---|---|---|---|---|---|---|---|
| Register on portal | ✅ | ✅ | ✅ | — | ✅ | ✅ | — |
| Submit SIF forms | ✅ | ❌ | ❌ | — | — | — | — |
| Pay regulatory charges | ✅ | ❌ | ❌ | — | — | — | — |
| Accept/Reject Faculty | ✅ | ❌ | ❌ | — | — | — | — |
| Access Job Portal | Via DIGIPHARMed | ✅ (Job Seeker) | ✅ (Job Seeker) | ✅ (Admin) | — | — | — |
| Appeal decisions | ✅ | ❌ | ❌ | — | — | — | — |
| Verify documents | ❌ | ❌ | ❌ | — | ✅ | ✅ | — |
| Raise compliance | ❌ | ❌ | ❌ | — | ✅ | — | — |
| Write final decision | ❌ | ❌ | ❌ | — | — | — | ✅ |
| Manage user accounts | ❌ | ❌ | ❌ | ✅ | — | — | — |
| Aadhaar verification | ❌ | ❌ | ✅ (mandatory) | — | — | — | — |
| HPR card generation | ❌ | ❌ | ✅ | — | — | — | — |
