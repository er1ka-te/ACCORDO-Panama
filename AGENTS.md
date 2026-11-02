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
- Keep Aria's AI calls and prompt in server-only helpers behind validated server functions; never send service credentials to the browser.
