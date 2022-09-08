import { Box, Stack, Text } from "@chakra-ui/react"
import { FC } from "react"

export interface CardProps {
  studentIntro: any
  onClick: () => void
}

export const Card: FC<CardProps> = (props) => {
  return (
    <Box
      p={4}
      display={{ md: "flex" }}
      maxWidth="32rem"
      borderWidth={1}
      margin={2}
      _hover={{
        background: "gray.900",
      }}
      onClick={props.onClick}
    >
      <Stack
        w="full"
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
        mr={{ md: 6 }}
      >
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="lg"
          letterSpacing="wide"
          color="gray.200"
        >
          {props.studentIntro.account.name}
        </Text>
        <Text my={2} color="gray.400">
          {props.studentIntro.account.message}
        </Text>
      </Stack>
    </Box>
  )
}
