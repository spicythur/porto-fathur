import ProjectModalClassic from "./ProjectModalClassic";
import ProjectModalFlip from "./ProjectModalFlip";

// Desktop (Projects ngirim getOrigin) → polaroid dibalik.
// Mobile (nggak ngirim getOrigin) → modal lama, persis versi sebelumnya.
export default function ProjectModal(props) {
    return props.getOrigin ? <ProjectModalFlip {...props} /> : <ProjectModalClassic {...props} />;
}
