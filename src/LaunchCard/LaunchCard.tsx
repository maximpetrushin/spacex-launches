import type {Launch} from "../types/types.ts";
import {Button, Card, Image, Text} from '@mantine/core'
import {LaunchContext} from "../context/LaunchContext.tsx";
import {useContext} from "react";

type LaunchCardProps = {
    launch: Launch;
}

function LaunchCard({launch}: LaunchCardProps) {

    const context = useContext(LaunchContext);
    if (!context) {
        throw new Error()
    }
    return (
        <Card shadow="sm" padding="md" radius="md" withBorder>
            <Image
                src={launch.links?.mission_patch_small ?? undefined}
                alt={launch.mission_name}
            />
            <Text fw={500}>{launch.mission_name}</Text>
            <Text size="sm" c="dimmed">{launch.rocket?.rocket_name}</Text>
            <Button color="blue" fullWidth mt="md" onClick={() => context.selectLaunch(launch)}>See more</Button>
        </Card>
    )
}

export default LaunchCard;

