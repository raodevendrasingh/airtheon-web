import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const HomeTabs = () => {
    return (
        <Tabs defaultValue="all" className="">
            <TabsList className="bg-transparent">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="tweets">Tweets</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="links">Links</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
                All of your memories will appear here
            </TabsContent>
            <TabsContent value="notes">
                All of your notes will appear here
            </TabsContent>
            <TabsContent value="tweets">
                All of your saved tweets will appear here
            </TabsContent>
            <TabsContent value="messages">
                All of your messages will appear here
            </TabsContent>
            <TabsContent value="links">
                All of your links will appear here
            </TabsContent>
        </Tabs>
    );
};
