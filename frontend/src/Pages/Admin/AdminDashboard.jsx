import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminUpload, SuperAdmin } from '@/Index';

const AdminDashboard = () => {
  return (
    <>
      <div className=" flex flex-col">
        {/* <div className="relative h-[300px] w-full overflow-hidden">
          <img
            width={'1600'}
            height={'300'}
            style={{ aspectRatio: '1600/300', objectFit: 'cover' }}
            src={accImage}
            alt="acc-image"
            className=" h-full w-full object-cover object-center"
          />
        </div> */}

        <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
          <div className="flex flex-col rounded-lg border bg-background shadow-sm p-6">
            <Tabs defaultValue="sadmin">
              <TabsList>
                <TabsTrigger value="sadmin">Super Admin</TabsTrigger>
                <TabsTrigger value="adminupload">Admin Upload</TabsTrigger>
              </TabsList>

              <TabsContent value="sadmin">
                <SuperAdmin />
              </TabsContent>

              <TabsContent value="adminupload">
                <AdminUpload />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
