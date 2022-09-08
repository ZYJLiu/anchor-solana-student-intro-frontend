import { Card } from "./Card"
import { FC, useEffect, useState } from "react"
import { Button, Center, HStack, Input, Spacer } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import { useWorkspace } from "../context/Anchor"
import { ReplyDetail } from "./ReplyDetail"

export const StudentIntroList: FC = () => {
  const { program } = useWorkspace()
  const [studentIntros, setStudentIntros] = useState<any | null>(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [result, setResult] = useState<any | null>(null)
  const [selected, setSelected] = useState<any | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const fetchAccounts = async () => {
      const accounts = (await program?.account.studentInfo.all()) ?? []
      console.log(accounts)
      const sort = [...accounts].sort((a, b) =>
        a.account.name > b.account.name ? 1 : -1
      )
      setStudentIntros(sort)
    }
    fetchAccounts()
  }, [])

  useEffect(() => {
    if (studentIntros && search != "") {
      const filtered = studentIntros.filter((studentIntro: any) => {
        return studentIntro.account.name
          .toLowerCase()
          .startsWith(search.toLowerCase())
      })
      console.log(filtered)
      setResult(filtered)
    }
  }, [search])

  useEffect(() => {
    if (studentIntros) {
      const filtered = studentIntros.slice((page - 1) * 1, page * 1)
      console.log(filtered)
      setResult(filtered)
    }
  }, [page, studentIntros])

  const handleSelected = (data: any) => {
    setSelected(data)
    onOpen()
  }

  return (
    <div>
      <Center>
        <Input
          id="search"
          color="gray.400"
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="Search"
          w="97%"
          mt={2}
          mb={2}
        />
      </Center>
      {selected && (
        <ReplyDetail
          isOpen={isOpen}
          onClose={onClose}
          studentIntro={selected}
        />
      )}
      {result && (
        <div>
          {Object.keys(result).map((key) => {
            const data = result[key as unknown as number]
            return (
              <Card
                key={key}
                studentIntro={data}
                onClick={() => {
                  handleSelected(data)
                }}
              />
            )
          })}
        </div>
      )}
      <Center>
        {studentIntros && (
          <HStack w="full" mt={2} mb={8} ml={4} mr={4}>
            {page > 1 && (
              <Button onClick={() => setPage(page - 1)}>Previous</Button>
            )}
            <Spacer />
            {studentIntros.length > page * 1 && (
              <Button onClick={() => setPage(page + 1)}>Next</Button>
            )}
          </HStack>
        )}
      </Center>
    </div>
  )
}
