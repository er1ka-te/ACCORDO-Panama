<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the interactive catalogue browser-local and version its storage key whenever the seed schema changes, so stale records cannot break new fields.
- Keep route modules focused on metadata and routing; render extracted domain screens from React components to preserve existing markup during refactors.
- Keep demonstration announcements, donations, orders, cart and learning progress in a validated versioned browser-local provider; this state is not authorization and does not perform real payments or notifications.
- Mount the experience provider in the root document shell and keep its context and consumer hook in a separate browser-safe module so every route shares stable context through Fast Refresh and error recovery.
- Keep learning content and progression checks in a browser-safe learning module; persist validated step progress and reset legacy shorter-course progress on migration so levels cannot be skipped.
- Filter removed products through the shared catalog policy on reads and writes, migrating prior local records without discarding unrelated publications.
- Keep Aria's AI calls and prompt in server-only helpers behind validated server functions; never send service credentials to the browser.
- Keep homepage impact presentation in a dedicated browser-safe component, and share the community message through site configuration so home and footer remain consistent.
- Render geographic impact in an isolated browser-safe component using public-domain country geometry and accessible popovers; keep its supplied editorial figures separate from operational donation records.
- Use Embla for the announcement carousel with existing provider images; keep autoplay browser-local and respect reduced motion and interaction pauses.
- Keep launcher drag gestures in a browser-safe hook with pointer capture, viewport bounds and drag-click suppression; animate the launcher independently from the chat panel so moving it never clips the conversation.
