# Absolute Electrical interactive preview

Run `npm start`, then open http://127.0.0.1:8080. Run `npm test` for the schedule-capacity checks.

Static frontend prototype. No deployment, authentication, external calendar, email, financial integrations or production request persistence. Customer data and photo object URLs remain in memory in the current tab; reload clears them. Use sample details. Network requests are limited to local assets. The business phone/email links reach the real existing business only if clicked.

The scheduling fixture in scheduling.js represents three electricians, skill eligibility, working hours, time off/busy intervals and 30-minute buffers. It offers pooled slots chronologically, restricts selections to 2–3, and revalidates before demo submission. This is not a production capacity reservation system. The admin/backend backlog remains in BACKLOG.md.

Production dependencies: verified business/brand/review content, real team/project imagery, authoritative schedule source, service-area validation, server-side intake/uploads and validation, transactional confirmation/notifications, authentication/roles, secure retention and monitoring, owner shipping approval.
