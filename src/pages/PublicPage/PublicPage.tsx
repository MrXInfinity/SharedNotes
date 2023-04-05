import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Card, IconButton, Skeleton, Stack } from "@mui/material";
import {
  QuerySnapshot,
  collection,
  documentId,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { NoDataComponent, PageLayout } from "../../components/UIComponents";
import { db } from "../../firebase";
import { publicNoteType } from "../../types/firestoreDataTypes";
import EachPublicItem from "./PublicItem";
import PublicNotePreview from "./PublicNotePreview";

const PublicPage = () => {
  const [publicData, setPublicData] = useState<publicNoteType[]>([]);
  const [lastDoc, setLastDoc] = useState<any>();
  const [publicPageNumber, setPublicPageNumber] = useState(1);
  const [selectedOnPreview, setSelectedOnPreview] = useState<{
    title: string;
    content: string;
  }>({ title: "", content: "" });
  const [isPreviewModalOpen, setisPreviewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const changePageNumber = (value: number) => {
    if (value === -1 && publicPageNumber === 1) {
      return;
    } else {
      setPublicPageNumber((prev) => prev + value);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
      setIsLoading(true);
    };
  }, []);

  useEffect(() => {
    const publicQuery = async () => {
      const authorList: string[] = [];
      const initialDataList: any[] = [];
      try {
        await getDocs(
          publicPageNumber > 1
            ? query(
                collection(db, "Shared"),
                orderBy("dateCreated", "desc"),
                startAfter(lastDoc),
                limit(10)
              )
            : query(
                collection(db, "Shared"),
                orderBy("dateCreated", "desc"),
                limit(10)
              )
        ).then((sharedQuerySnapshot) => {
          sharedQuerySnapshot.forEach((eachShared) => {
            initialDataList.push({ id: eachShared.id, ...eachShared.data() });
            if (!authorList!.includes(eachShared.data().author)) {
              authorList.push(eachShared.data().author);
            }
          });
          setLastDoc(
            sharedQuerySnapshot.docs[sharedQuerySnapshot.docs.length - 1]
          );
        });
        await getDocs(
          query(collection(db, "Users"), where(documentId(), "in", authorList))
        ).then((userQuerySnapshot) => {
          setPublicData(
            initialDataList.map((eachData) => ({
              ...eachData,
              profilePicId: `${eachData.author}/profilePic.jpg`,
              author: userQuerySnapshot.docs.reduce(
                (obj, item) => ({
                  ...obj,
                  [item.id]: `${item.data().firstname} ${item.data().lastname}`,
                }),
                {}
              )[eachData.author],
            }))
          );
        });
      } catch (err) {
        console.log(err);
      }
    };

    publicQuery();
  }, [publicPageNumber]);

  return (
    <PageLayout
      title="Public Page"
      customCss={{
        display: { xs: "flex", sm: "grid" },
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        flexDirection: "column",
      }}
      action={
        <Stack
          direction="row"
          sx={{ ml: 2, display: "flex", alignItems: "center" }}
        >
          <IconButton
            onClick={() => changePageNumber(-1)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              px: 1.5,
            }}
          >
            <ArrowBackIosNewIcon color="primary" />
          </IconButton>
          <IconButton
            onClick={() => changePageNumber(1)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              px: 1.5,
            }}
          >
            <ArrowForwardIosIcon color="primary" />
          </IconButton>
        </Stack>
      }
      pageList={
        isLoading ? (
          <Card
            sx={{
              width: "100%",
              borderRadius: "16px",
              display: "flex",
              height: "min-content",
              maxHeight: "200px",
              py: 1.7,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "start",
              gap: { xs: 1.5, md: 2 },
              p: 2,
            }}
          >
            <Stack
              direction={"column"}
              sx={{ maxWidth: { xs: "100px" } }}
            >
              <Skeleton
                variant="circular"
                width={100}
                height={100}
              />
              <Stack
                direction="column"
                spacing={2}
                sx={{
                  mt: 1,
                }}
              >
                <Skeleton
                  variant="text"
                  sx={{ fontSize: 14, width: "100%" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: 12, width: "100%" }}
                />
              </Stack>
            </Stack>
            <Stack
              direction="column"
              sx={{ flexGrow: 1 }}
            >
              <Skeleton
                variant="text"
                sx={{ fontSize: 16, width: "100%" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: 115, width: "100%" }}
              />
            </Stack>
          </Card>
        ) : publicData.length === 0 ? (
          <NoDataComponent title="No Public Notes Found..." />
        ) : (
          <>
            {publicData.map((eachData: publicNoteType, index) => (
              <EachPublicItem
                data={eachData}
                setPreviewData={setSelectedOnPreview}
                index={index}
                toggleModal={setisPreviewModalOpen}
              />
            ))}
          </>
        )
      }
      modal={
        Object.keys(selectedOnPreview).length > 0 ? (
          <PublicNotePreview
            data={selectedOnPreview}
            isOpen={isPreviewModalOpen}
            setIsOpen={setisPreviewModalOpen}
          />
        ) : (
          <></>
        )
      }
    />
  );
};

export default PublicPage;
