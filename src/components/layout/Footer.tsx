type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="flex items-center bottom-0 inset-x-0 bg-[#111827] h-[124px]">
      <div className="container mx-auto px-4 flex flex-col gap-4 md:flex-row md:justify-between md:items-end text-white">
        <div>
          <p className="font-semibold">Drivehub Co.,Ltd</p>
          <p className="text-xs">
            193-195 Lake Rajada Office Complex, <br />
            Ratchadapisek road, Khlong Toei, Bangkok
          </p>
        </div>
        <p className="text-xs text-[#E5E7EB]">© Drivehub 2023</p>
      </div>
    </div>
  );
};

export default Footer;
