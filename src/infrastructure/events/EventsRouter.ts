import { EventBridgeRoutes } from "aws-events-adapter";
import { eventUseCases } from "../../interfaces/events/eventUseCases";

export const eventsRouter: EventBridgeRoutes = {
    "hello": eventUseCases.hello
};

