import { Badge } from "./ui/badge"

export function BadgeDemo({ children }: { children: React.ReactNode }) {
    return <Badge variant="secondary">{children}</Badge>
}
