#!/usr/bin/nu

def --wrapped main [...args] {
  open youtube_no_animation.js
    | str replace '{LIKE_ACTIVE_SVG}' (open like_active.svg | str trim)
    | str replace '{LIKE_INACTIVE_SVG}' (open like_inactive.svg | str trim)
    | save --force youtube_no_animation.user.js
}
