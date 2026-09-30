import { createPortal } from "react-dom";
import type {Launch} from "../types/types.ts";
import {Image, Group, Stack, Text, Overlay, Flex, Box, ScrollArea, ActionIcon} from "@mantine/core";

type LaunchModalProps = {
    selectedLaunch: Launch;
    onClose: () => void;
}

function LaunchModal({selectedLaunch, onClose}: LaunchModalProps) {


    const modalRoot = document.getElementById("modal-root");

    if (!modalRoot) {
        throw new Error("Modal root not found");
    }

    return createPortal(
        <Flex pos='fixed' inset={0} justify='center' align='center'>
            <Overlay color="#000" backgroundOpacity={0.35} blur={15} zIndex={3} onClick={() => onClose()}/>
            <Box style={{zIndex: 4, borderRadius: "16px"}} bg="white"
                 w="50%"
                 p="md"
                 maw="800px"
                 h='70vh'
            >
                <ScrollArea h="100%">
                <Group justify='space-between'>
                    <Text fw='bold'>{selectedLaunch.mission_name}</Text>
                    <ActionIcon variant='default' onClick={() => onClose()}>X</ActionIcon>
                </Group>
                <Flex justify='center' align='center'>
                <Image src={selectedLaunch.links?.mission_patch ?? undefined} w='50%'/>
                </Flex>
                    <Stack justify='space-between' gap='lg'>
                        <Stack
                            align="stretch"
                            justify="flex-start"
                        >
                            <Text fw='bold'>Mission name:</Text>
                            <Text>{selectedLaunch.mission_name}</Text>
                        </Stack>
                        <Stack>
                            <Text fw='bold'>Rocket name:</Text>
                            <Text>{selectedLaunch.rocket?.rocket_name}</Text>
                        </Stack>
                        <Stack>
                            <Text fw='bold'>Details:</Text>
                            <Text>{selectedLaunch.details}</Text>
                        </Stack>
                    </Stack>
                </ScrollArea>
            </Box>
        </Flex>,
        modalRoot
    );
}

export default LaunchModal;