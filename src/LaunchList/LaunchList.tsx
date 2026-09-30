import type {Launch} from "../types/types.ts";
import { Container, Flex, Loader, SimpleGrid, Title} from "@mantine/core";
import LaunchCard from '../LaunchCard/LaunchCard.tsx'



type LaunchListProps = {
    launches: Launch[];
    isLoading: boolean;
};


function LaunchList({launches, isLoading}: LaunchListProps) {



    return (
        <Container>
            <Flex justify="center">
                <Title mb='xl'>SpaceX Launches 2020</Title>
            </Flex>
            {isLoading ? (
                <Flex justify="center">
                    <Loader color="blue" size="xl" type="dots"/>
                </Flex>
                ) : (
                <SimpleGrid cols={3}>
                    {launches.map((launch) => (
                        <LaunchCard key={launch.mission_name} launch={launch}/>
                    ))}
                </SimpleGrid>
            )}
        </Container>
    )
}

export default LaunchList;