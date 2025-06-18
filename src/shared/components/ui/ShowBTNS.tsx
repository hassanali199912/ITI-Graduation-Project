import Button from "../button/index";

const ButtonShowcase = () => {
    const variants = ["primary", "secondary", "medium"] as const;
    const typeVariants = {
        primary: ["brand", "neutral"],
        secondary: ["solid", "outline", "gray", "black"],
        medium: ["subtle", "transparent"],
    } as const;
    const sizes :any[] = ["xs", "xs20", "md", "sl", "lg", "sm"];

    return (
        <div className="space-y-8 p-8">
            {variants.map((variant) => (
                <div key={variant}>
                    <h2 className="text-xl font-bold mb-2 capitalize">{variant} buttons</h2>
                    {typeVariants[variant].map((type) => (
                        <div key={type} className="mb-4">
                            <h3 className="text-sm font-medium mb-2">{type}</h3>
                            <div className="flex gap-3 flex-wrap">
                                {sizes.map((size) => (
                                    <Button
                                        key={`${variant}-${type}-${size}`}
                                        variant={variant}
                                        typeVariant={type}
                                        size={size}
                                    >
                                        {`${variant}/${type} (${size})`}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}

            <div className="mt-10">
                <h2 className="text-xl font-bold mb-2">Special States</h2>
                <div className="flex gap-4 flex-wrap">
                    <Button variant="primary" typeVariant="brand" isLoading>
                        Loading...
                    </Button>
                    <Button variant="secondary" typeVariant="black" disabled>
                        Disabled
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ButtonShowcase;
