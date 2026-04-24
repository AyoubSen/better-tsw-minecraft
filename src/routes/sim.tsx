import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/sim')({ component: ArchivedSimPage })

function ArchivedSimPage() {
  /*
    Archived simulator route.

    We intentionally pulled the interactive simulator out of the live app because it drifted away
    from the product's actual purpose and was adding complexity without enough teaching value.

    We might come back to this later with a much narrower concept, but for now `/sim` simply
    forwards users to the directed guides page instead of exposing the old mock-Minecraft UI.
  */
  return <Navigate to="/directed-guides" />
}
